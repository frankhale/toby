// nw.js
// Copyright (C) 2016 Frank Hale <frankhale@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function() {

  const path = require("path"),
        spawn = require("child_process").spawn,
        split = require("split"),
        _ = require("lodash"),
        request = require("request"),
        node = spawn(".\\node.exe", ["./build/server.js"], { cwd: process.cwd() }),
        $content = $("#content"),
        $webview = $("#webview"),
        webview = $webview[0],
        snapToPlayerCodeBlock = `var actualCode = '(' + function() {
            snapToPlayer();
          } + ')();';
          var script = document.createElement('script');
          script.textContent = actualCode;
          (document.head||document.documentElement).appendChild(script);
          script.parentNode.removeChild(script);`;

  key("f1", function() {
    if($content.css("visibility") === "hidden") {
      $content.css("visibility", "visible");
      $webview.css("visibility", "hidden");
    } else {
      $content.css("visibility", "hidden");
      $webview.css("visibility", "visible");
    }
  });

  if(navigator.userAgent.includes("node-webkit")) {
    let win = nw.Window.get();

    key("f11", function() {
      if(win.isFullscreen) {
        win.leaveFullscreen();
      } else {
        win.enterFullscreen();
      }
    });

    win.on("loaded", function() {
      //win.showDevTools();
      win.show();
    });

    win.on("restore", function() {
      webview.executeScript({ code: snapToPlayerCodeBlock });
    });

    win.on("new-win-policy", function(frame, url, policy){
      policy.ignore();
    });

    win.on("close", function() {
      win.hide();

      $webview.remove();

      $.ajax({
        type: "POST",
        url: "/api/app/close",
        async:false
      });

      win.close(true);
    });
  }

  if(navigator.userAgent.includes("node-webkit") || navigator.userAgent.includes("Electron")) {
    let socket = require("socket.io")(62375);

    socket.on("connection", function(s) {
      $content.append("Socket.IO connection established...<br/>");

      s.on("title", function(t) {
        if(t.title !== undefined && t.title !== "") {
          $content.append(`setting title to: ${t.title}<br/>`);
          document.title = t.title;
        }
      });
    });

    webview.addEventListener("permissionrequest", function(e) {
      if (e.permission === "fullscreen") {
        e.request.allow();
      }
    });

    const newWindowHandler = (e) => {
      // Looks like we can differentiate between clicking the YouTube icon
      // in the player where we want it to open an external browser and clicking
      // a suggested video link after a video is played.
      //
      // When clicking the YouTube link "time_continue" is present in the url.
      // {url: "https://www.youtube.com/watch?time_continue=1&v=ctrZdbExVrk"}
      //
      // When clicking on a suggested video the link is just an ordinary YouTube
      // video link with video ID.
      // {url: "https://www.youtube.com/watch?v=4nYMdMtGsPo"}

      // NOTE: What I said above is only partially true, the video has to start
      // playing for the time_continue to be present in the URL. You cannot 
      // click the YouTube link and have it open an external browser if the 
      // video has not started to play.

      e.preventDefault();

      const url = e.targetUrl || e.url;

      //console.log(url);

      if(url.includes("?v=")) {
        // the id extraction is almost verbatim from:
        // http://stackoverflow.com/a/3452617/170217
        let video_id = url.split("v=")[1];
        let ampersandPosition = video_id.indexOf("&");
        if(ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        //------------------------------------------

        $content.append(`emitting: play-video for ${video_id}<br/>`);

        socket.emit("play-video", {
          url: url,
          ytid: video_id
        });
      } else {
        if(navigator.userAgent.includes("node-webkit")) {
          nw.Shell.openExternal(url);
        } else if(navigator.userAgent.includes("Electron")) {
          const {shell} = require("electron");
          shell.openExternal(url);
        }
      }
    };

    if(navigator.userAgent.includes("Electron")) {
      webview.addEventListener('new-window', newWindowHandler);
    } else if (navigator.userAgent.includes("node-webkit")) {
      webview.addEventListener("newwindow", newWindowHandler);
    }
  }

  var resizeContent = function() {
    $content.css("width", window.innerWidth - 20);
    $content.css("height", window.innerHeight - 20);
  };

  window.addEventListener("resize", function(e) {
    resizeContent();
  });

  resizeContent();

  function strip(s) {
    // regex from: http://stackoverflow.com/a/29497680/170217
    return s.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
  }

  function redirectOutput(x) {
    let lineBuffer = "";

    x.on("data", function (data) {
      lineBuffer += data.toString();
      var lines = lineBuffer.split("\n");

      _.forEach(lines, function(l) {
        if(l !== "") {
          //console.log(strip(l));
          $content.append(strip(l) + "<br/>");
        }
      });

      lineBuffer = lines[lines.length - 1];
    });
  }

  if(navigator.userAgent.includes("Electron")) {
    window.addEventListener("beforeunload", function(e) {
      $.ajax({
        type: "POST",
        url: "/api/app/close",
        async: false
      });
    });

    // webview.addEventListener("dom-ready", () => {
    //   webview.openDevTools();
    // });

    const browserWindow = require("electron").remote.getCurrentWindow();
    browserWindow.on("leave-html-full-screen", function() {
      webview.executeJavaScript(snapToPlayerCodeBlock);//, null, function(result) {
      //  console.log(result);
      //});
    });

    key("f11", function() {
      if(bowserWindow.isFullScreen()) {
        bowserWindow.setFullScreen(false);
        webview.executeJavaScript(snapToPlayerCodeBlock);
      } else {
        bowserWindow.setFullScreen(true);
      }
    });
  }

  redirectOutput(node.stdout);
  redirectOutput(node.stderr);

  function checkServerRunning() {
    request("http://localhost:62374", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        $webview.attr("src", "http://localhost:62374");
        $("#loading").css("display", "none");
        $webview.css("display", "block");
      } else {
        setTimeout(checkServerRunning, 1000);
      }
    });
  }

  checkServerRunning();
})();
