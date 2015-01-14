//
// Toby - A tiny personal YouTube player for the desktop
//
// Frank Hale <frankhale@gmail.com>
// 17 December 2014
//
var APP = (function() {
  var my = {};

  var fs = require('fs'),
    path = require('path'),
    remote = require('remote'),
    browser = remote.getCurrentWindow(),
    searchPlayListTitle = "Video Search",
    dataFilePathParts = ["resources", "app", "data", "data.json"],
    dataFilePath = process.cwd() + path.sep + dataFilePathParts.join(path.sep),
    $body,
    $web,
    $webview,
    $recentlyPlayed,
    $recentlyPlayedList,
    $searchList,
    $searchResults,
    $searchBox,
    currentVideoTitle,
    autoplay = true,
    videoData,
    recentlyPlayed = [];

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
    if ($web.attr('src') === 'about:blank') {
      return;
    }

    $playList.css('display', 'none');
    
    if ($web.css('visibility') === 'hidden') {
      browser.setTitle(currentVideoTitle);
      $searchList.css('display', 'none');
      $recentlyPlayed.css('display', 'none');
      $web.css('visibility', 'visible');
      $body.css('overflow', 'auto');
    } else {
      browser.setTitle(searchPlayListTitle);
      $body.css('overflow', 'hidden');
      $searchList.css('display', 'block');
      $recentlyPlayed.css('display', 'block');
      $web.css('visibility', 'hidden');
    }
  };

  var addToRecentlyPlayedList = function(v) {
    console.log(v);
    console.log(recentlyPlayed.length);
    if(recentlyPlayed.length > 0) {
      var found = _.find(recentlyPlayed, function(video) {
        if(video.title === v.title) {
          return v;
        }
      });

      if(found === undefined) {
        $recentlyPlayedList.append(v.title + "<br/>");
        recentlyPlayed.push(v);
      }
    } else {
      $recentlyPlayedList.append(v.title + "<br/>");
      recentlyPlayed.push(v);
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

    addToRecentlyPlayedList({ 'title': title, 'url': url});

    $searchBox.val("");
    $searchResults.html("");
    $searchResults.css('display', 'none');
  };

  my.init = function() {
    // from: http://theoryapp.com/string-startswith-and-endswith-in-javascript/
    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function(prefix) {
        return this.slice(0, prefix.length) == prefix;
      };
    }

    $body = $("body");
    $playList = $("#playList");
    $web = $("#webview");
    $webview = $("#webview")[0];
    $recentlyPlayed = $("#recentlyPlayed");
    $recentlyPlayedList = $("#recentlyPlayedList");
    $searchList = $("#searchList");
    $searchResults = $("#searchResults");
    $searchBox = $("#searchBox");

    $webview.addEventListener("new-window", function(e) {
      require('shell').openExternal(e.url);
    });

    browser.setTitle(searchPlayListTitle);

    loadDataFile(function(data) {
      videoData = data;
    });

    fs.watchFile(dataFilePath, function(curr, prev) {
      loadDataFile(function(data) {
        videoData = data;
      });
    });

    $searchBox.on('input', function(e) {
      var results = [],
        html = [];
      var val = $(this).val().toLowerCase();

      if (val === "") {
        $searchResults.html("");
        $searchResults.css('display', 'none');
        $recentlyPlayed.css('display', 'block');

        return;
      }

      _.forEach(videoData, function(g) {
        if (g.title !== undefined && g.videos !== undefined) {
          _.forEach(g.videos, function(v) {
            if (v.description.toLowerCase().startsWith(val)) {
              results.push(v);
            }
          });
        }
      });

      if (results.length > 0) {
        _.forEach(results, function(r) {
          html.push("<a href='#' url='" + r.url + "'>" + r.description + "</a><br/>");
        })

        $searchResults.css('display', 'block');
        $recentlyPlayed.css('display', 'none');
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
