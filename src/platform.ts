// platform.js - Platform specific code for Toby
// Author(s): Frank Hale <frankhale@gmail.com>
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

import * as stream from "stream";
import { spawn, ChildProcess } from "child_process";
import * as _ from "lodash";
import * as request from "request";
import AppConfig from "./config";

const titleCase = require("title-case");
const pkgJSON = require("../package.json");
// const ioHook = require("iohook");

class Platform {
  private node: ChildProcess;
  private $content: JQuery;
  private $webview: JQuery;
  private webview: any;
  private snapToPlayerCodeBlock: string;
  private socket: SocketIO.Server;
  private serverLog: String[];

  static bootstrap() {
    return new Platform();
  }

  constructor() {
    this.node = spawn(
      ".\\node_modules\\node\\bin\\node.exe",
      ["./build/server.js"],
      {
        cwd: process.cwd()
      }
    );
    this.$content = $("#content");
    this.$webview = $("#webview");
    this.webview = this.$webview[0];
    this.serverLog = [];

    document.title = pkgJSON.title;

    this.socket = require("socket.io")(AppConfig.socketIOPort);
    this.socket.on("connection", s => {
      this.$content.append("Socket.IO connection established...<br/>");

      s.on("title", (t: string) => {
        if (t !== undefined && t !== "") {
          this.$content.append(`setting title to: ${t}<br/>`);
          document.title = t;
        }
      });

      s.on("toggle-server-log", () => {
        this.f1Handler();
      });

      s.on("toggle-fullscreen", () => {
        this.f11Handler();
      });

      s.on("get-server-log", () => {
        s.emit("server-log", { log: this.serverLog });
      });

      s.emit("toby-version", {
        title: pkgJSON.title,
        version: `${titleCase(pkgJSON.name)}-${pkgJSON.version}`
      });
    });

    this.snapToPlayerCodeBlock = `var actualCode = '(' + function() {
        snapToPlayer();
      } + ')();';
      var script = document.createElement('script');
      script.textContent = actualCode;
      (document.head||document.documentElement).appendChild(script);
      script.parentNode.removeChild(script);
      `;

    this.redirectOutput(this.node.stdout);
    this.redirectOutput(this.node.stderr);

    let checkServerRunning = setInterval(() => {
      request(AppConfig.serverURL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          this.$webview.attr("src", AppConfig.serverURL);
          $("#loading").css("display", "none");
          this.$webview.css("display", "block");
          clearInterval(checkServerRunning);
        }
      });
    }, 1000);

    this.setup();
  }
  private setup(): void {
    key("f1", this.f1Handler);
    key("f11", this.f11Handler);

    if (navigator.userAgent.indexOf("node-webkit") > -1) {
      let win = nw.Window.get();

      win.on("loaded", () => {
        // win.showDevTools();
        win.show();
      });

      win.on("restore", () => {
        this.webview.executeScript({ code: this.snapToPlayerCodeBlock });
      });

      win.on("new-win-policy", (_frame, _url, policy) => {
        policy.ignore();
      });

      win.on("close", () => {
        win.hide();

        this.$webview.remove();

        $.ajax({
          type: "POST",
          url: "/api/app/close",
          async: false
        });

        win.close(true);
      });

      this.webview.addEventListener(
        "newwindow",
        this.newWindowHandler.bind(this)
      );
    }

    window.addEventListener("resize", e => {
      this.resizeContent();
    });

    this.resizeContent();

    if (
      navigator.userAgent.indexOf("node-webkit") > -1 ||
      navigator.userAgent.indexOf("Electron") > -1
    ) {
      this.webview.addEventListener("permissionrequest", (e: any) => {
        if (e.permission === "fullscreen") {
          e.request.allow();
        }
      });
    }

    if (navigator.userAgent.indexOf("Electron") > -1) {
      this.webview.addEventListener(
        "new-window",
        this.newWindowHandler.bind(this)
      );

      window.addEventListener("beforeunload", () => {
        $.ajax({
          type: "POST",
          url: "/api/app/close",
          async: false
        });
      });

      // this.webview.addEventListener("dom-ready", () => {
      //  this.webview.openDevTools();
      // });

      let browserWindow = require("electron").remote.getCurrentWindow();

      this.webview.addEventListener("enter-html-full-screen", () => {
        if (!browserWindow.isFullScreen()) {
          browserWindow.setFullScreen(true);
        }
      });

      browserWindow.on("leave-full-screen", () => {
        this.webview.executeJavaScript(this.snapToPlayerCodeBlock);
      });
    }
  }
  private resizeContent(): void {
    this.$content.css("width", window.innerWidth - 20);
    this.$content.css("height", window.innerHeight - 20);
  }
  private strip(s: string): string {
    // regex from: http://stackoverflow.com/a/29497680/170217
    return s.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    );
  }
  private redirectOutput(x: stream.Readable): void {
    let lineBuffer = "";

    x.on("data", data => {
      lineBuffer += data.toString();
      let lines = lineBuffer.split("\n");

      _.forEach(lines, l => {
        if (l !== "") {
          // console.log(this.strip(l));
          let strippedData = this.strip(l);
          this.$content.append(`${strippedData}<br/>`);
          this.serverLog.push(strippedData);
        }
      });

      lineBuffer = lines[lines.length - 1];
    });
  }
  private newWindowHandler(e: any): void {
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

    if (url.indexOf("?v=") > -1) {
      // the id extraction is almost verbatim from:
      // http://stackoverflow.com/a/3452617/170217
      let video_id = url.split("v=")[1];
      let ampersandPosition = video_id.indexOf("&");
      if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      // ------------------------------------------

      this.$content.append(`emitting: play-video for ${video_id}<br/>`);
      this.socket.emit("play-video", video_id);
    } else {
      if (navigator.userAgent.indexOf("node-webkit") > -1) {
        nw.Shell.openExternal(url);
      } else if (navigator.userAgent.indexOf("Electron") > -1) {
        const { shell } = require("electron");
        shell.openExternal(url);
      }
    }
  }
  private f1Handler(): void {
    let $content = $("#content"),
      $webview = $("#webview");

    if ($content.css("visibility") === "hidden") {
      $content.css("visibility", "visible");
      $webview.css("visibility", "hidden");
    } else {
      $content.css("visibility", "hidden");
      $webview.css("visibility", "visible");
    }
  }
  private f11Handler(): void {
    if (navigator.userAgent.indexOf("node-webkit") > -1) {
      let win = nw.Window.get();

      if (win.isFullscreen) {
        win.leaveFullscreen();
      } else {
        win.enterFullscreen();
      }
    } else if (navigator.userAgent.indexOf("Electron") > -1) {
      const browserWindow = require("electron").remote.getCurrentWindow();

      if (browserWindow.isFullScreen()) {
        browserWindow.setFullScreen(false);
        this.webview.executeJavaScript(this.snapToPlayerCodeBlock);
      } else {
        browserWindow.setFullScreen(true);
      }
    }
  }
}

$(document).ready(function() {
  Platform.bootstrap();
});
