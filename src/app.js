//
// Toby - A tiny personal YouTube player for the desktop
//
// Frank Hale <frankhale@gmail.com>
// 3 November 2014
//
var APP = (function() {
  var my = {};

  var fs = require('fs'),
    remote = require('remote'),
    browser = remote.getCurrentWindow(),
    searchPlayListTitle = "Video Search",
    dataFilePath = process.cwd() + "\\resources\\app\\data\\data.json",
    $web,
    $webview,
    $searchList,
    $searchResults,
    $searchBox,
    currentVideoTitle = "",
    autoplay = true,
    videoData;

  var keyCodes = {
    f1: 112, // toggle between video search and video playback
    f3: 114, // restart app
    f12: 123 // open dev tools
  };

  var loadDataFile = function(callback) {
    fs.readFile(dataFilePath, function(err, data) {
      if (err) throw err;
      data = JSON.parse(data.toString());
      if (callback !== undefined) {
        callback(data);
      }
    });
  };

  var toggleSearchPlayListAndWebview = function() {
    if ($web.attr('src') === undefined) {
      return;
    }

    $playList.css('display', 'none');

    if ($web.css('visibility') === 'hidden') {
      browser.setTitle(currentVideoTitle);
      $searchList.css('display', 'none');
      $web.css('visibility', 'visible');
    } else {
      browser.setTitle(searchPlayListTitle);
      $searchList.css('display', 'block');
      $web.css('visibility', 'hidden');
    }
  };

  var documentOnkeydown = function(e) {
    function keyBind(k, fun) {
      if (k === e.keyCode) {
        e.preventDefault();
        fun();
      }
    }

    keyBind(keyCodes.f1, function() {
      toggleSearchPlayListAndWebview();
    });

    keyBind(keyCodes.f3, function() {
      browser.reload();
    });

    keyBind(keyCodes.f12, function() {
      browser.toggleDevTools();
    });

    return e;
  };

  my.playVideo = function(title, url) {
    if ($web.attr('src') !== null && $webview.isLoading()) {
      $webview.stop();
    }

    $web.attr('src', url);
    currentVideoTitle = title;
    browser.setTitle(title);
    toggleSearchPlayListAndWebview();
  };

  my.init = function() {
    // from: http://theoryapp.com/string-startswith-and-endswith-in-javascript/
    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function(prefix) {
          return this.slice(0, prefix.length) == prefix;
      };
    }

    $playList = $("#playList");
    $web = $("#webview");
    $webview = $("#webview")[0];
    $searchList = $("#searchList");
    $searchResults = $("#searchResults");
    $searchBox = $("#searchBox");

    function newWindow(e) {
      require('shell').openExternal(e.url);
    }

    $webview.addEventListener("new-window", newWindow);
    browser.setTitle(searchPlayListTitle);

    loadDataFile(function(data) {
      videoData = data;
    });

    fs.watchFile(dataFilePath, function(curr, prev) {
      loadDataFile(function(data) {
        videoData = data;
      });
    });

    $searchBox.on('input',function(e) {
      var results = [],
          html = [];
      var val = $(this).val().toLowerCase();

      if(val==="") {
        $searchResults.html("");
        return;
      }

      _.forEach(videoData, function(g) {
        if (g.title !== undefined && g.videos !== undefined) {
          _.forEach(g.videos, function(v) {
            if(v.description.toLowerCase().startsWith(val)) {
              results.push(v);
            }
          });
        }
      });

      if(results.length > 0) {
        _.forEach(results, function(r) {
          console.log(r.description);
          html.push("<a href='#' url='" + r.url + "'>" + r.description + "</a><br/>");
        })

        $searchResults.html(html.join(''));

        $("#searchResults a").each(function() {
          this.onclick = function() {
            var url = $(this).attr('url');

            if (autoplay) {
              url = url + "?autoplay=1";
            }

            my.playVideo($(this).text(), url);
          };
        });
      }
    });

    window.onkeydown = function(e) {
      documentOnkeydown(e);
    };
  };

  return my;
})();

$(document).ready(function() {
  APP.init();
});
