//
// Toby - A small YouTube player and play list tracker
//
// A simple video player for YouTube
// Frank Hale <frankhale@gmail.com>
// 2 November 2014
//
var APP = (function() {
  var my = {};

  var fs = require('fs'),
    remote = require('remote'),
    browser = remote.getCurrentWindow(),
    playListTitle = "Play List",
    dataFilePath = process.cwd() + "\\resources\\app\\data\\data.json",
    $playList,
    $web,
    web,
    currentVideoTitle,
    autoplay = true;

  var keyCodes = {
    f1: 112, // toggle between play list and video playback
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

  var buildPlayListUI = function(data) {
    var html = [];

    _.forEach(data, function(g) {
      if (g.title !== undefined && g.videos !== undefined) {
        html.push("<h3>" + g.title + "</h3>");
        html.push("<ul>");
        _.forEach(g.videos, function(v) {
          html.push("<li><a href='#' url='" + v.url + "'>" + v.description + "</a></li>");
        });
        html.push("</ul>");
      }
    });

    if (html.length > 0) {
      $playList.html(html.join(''));
    } else {
      $playList.html("Couldn't parse data file...");
    }

    $("#playList a").each(function() {
      this.onclick = function() {
        var url = $(this).attr('url');

        if (autoplay) {
          url = url + "?autoplay=1";
        }

        my.playVideo($(this).text(), url);
      };
    });
  };

  var togglePlaylistAndWebView = function() {
    if ($web.attr('src') === undefined) {
      return;
    }

    if ($web.attr('src') !== undefined && $web.css('visibility') === 'hidden') {
      browser.setTitle(currentVideoTitle);
      $playList.css('display', 'none');
      $web.css('visibility', 'visible');
    } else {
      browser.setTitle(playListTitle);
      $playList.css('display', 'block');
      $web.css('visibility', 'hidden');
    }
  };

  var documentOnkeydown = function(e) {
    e.preventDefault();

    function keyBind(k, fun) {
      if (k === e.keyCode) {
        fun();
      }
    }

    keyBind(keyCodes.f1, function() {
      togglePlaylistAndWebView();
    });

    keyBind(keyCodes.f3, function() {
      browser.reload();
    });

    keyBind(keyCodes.f12, function() {
      browser.toggleDevTools();
    });

    return true;
  };

  my.playVideo = function(title, url) {
    if (web.src !== null && web.isLoading()) {
      web.stop();
    }

    $web.attr('src', url);
    currentVideoTitle = title;
    browser.setTitle(title);
    togglePlaylistAndWebView();
  };

  my.init = function() {
    $playList = $("#playList");
    $web = $("#web");

    web = document.getElementById('web');

    browser.setTitle(playListTitle);

    loadDataFile(buildPlayListUI);

    fs.watchFile(dataFilePath, function(curr, prev) {
      loadDataFile(buildPlayListUI);
    });

    function newWindow(e) {
      require('shell').openExternal(e.url);
    }

    web.addEventListener("new-window", newWindow);

    window.onkeydown = function(e) {
      documentOnkeydown(e);
    };
  };

  return my;
})();

$(document).ready(function() {
  APP.init();
});
