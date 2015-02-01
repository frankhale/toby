//
// Toby - A tiny personal YouTube player for the desktop
//
// Status: This is a work in progress, this is a rewrite using React.js.
//
// Frank Hale <frankhale@gmail.com>
// 31 January 2015
//

"use strict";

var TobyReact = (function() {
  var my = {};

  var fs = require('fs'),
      path = require('path'),
      remote = require('remote'),
      shell = require('shell');
  
  var browser = remote.getCurrentWindow();
  browser.openDevTools();

  var SearchResults = React.createClass({
    render: function() {
      return (
        <h1>Hello, World!</h1>
      );
    }
  });

  var Toby = React.createClass({
    getInitialState: function() {
      return {
        browser: remote.getCurrentWindow(),
        dataFilePathParts: ["resources", "app", "data", "data.json"],
        dataFilePath: process.cwd() + path.sep + ["resources", "app", "data", "data.json"].join(path.sep),
        searchPlayListTitle: "Toby - Video Search",
        webviewSrc: "about:blank",
        searchListStyle: {
          display: "block"
        },
        playListStyle: {
          display: "none"
        },
        recentlyPlayedStyle: {
          display: "none"
        },
        webviewStyle: {
          display: "none"
        }
      };
    },
    componentDidMount: function() {
      window.onkeydown = this.handleKeyDown;
        
      this.state.browser.openDevTools();
      this.state.browser.setTitle(this.state.searchPlayListTitle);

      this.loadDataFile(function(data) {
        this.setState({videoData: data});
      }.bind(this));

      this.setState({web: $("#webview")});
      this.setState({webview: $("#webview")[0]});
      this.state.webview.addEventListener("new-window", function(e) {
        shell.openExternal(e.url);
      });

      fs.watchFile(this.state.dataFilePath, function(curr, prev) {
        loadDataFile(function(data) {
          this.setState({videoData: data});
        });
      });
    },
    loadDataFile: function(callback) {
      fs.readFile(this.state.dataFilePath, function(err, data) {
        if (err) throw err;
        data = JSON.parse(data.toString());
        if (callback !== undefined) {
          callback(data);
        }
      });
    },
    toggleSearchPlayListAndWebview: function() {      
      if (this.state.web.attr('src') === 'about:blank') {
        return;
      }

      this.setState({ playListStyle: {
        display: "none"
      }});

      /*if ($web.css('visibility') === 'hidden') {
        browser.setTitle(currentVideoTitle);
        $searchList.css('display', 'none');

        if (recentlyPlayed.length > 0) {
          $recentlyPlayed.css('display', 'none');
        }

        $web.css('visibility', 'visible');
        $body.css('overflow', 'auto');
      } else {
        /*browser.setTitle(searchPlayListTitle);
        $body.css('overflow', 'hidden');
        $searchList.css('display', 'block');

        if (recentlyPlayed.length > 0) {
          $recentlyPlayed.css('display', 'block');
        }

        $web.css('visibility', 'hidden');
      }*/
    },
    addToRecentlyPlayedList: function(v) {
      /*var found = _.find(recentlyPlayed, function(video) {
        if (video.title === v.title) {
          return v;
        }
      });

      if (found === undefined) {
        var anchor = $("<a href='#' url='" + v.url + "'>" + v.title + "</a><br/>");

        anchor.click(function() {
          var url = anchor.attr('url');

          my.playVideo(anchor.text(), url);
        });

        $recentlyPlayedList.append(anchor);
        recentlyPlayed.push(v);
      }*/
    },
    hookupAnchors: function(elem) {
      /*$(elem + " a").each(function() {
        this.onclick = function() {
          var url = $(this).attr('url');

          if (autoplay) {
            url = url + "?autoplay=1";
          }

          my.playVideo($(this).text(), url);
        };
      });*/
    },
    playVideo: function(title, url) {
      /*addToRecentlyPlayedList({
        'title': title,
        'url': url
      });

      if ($web.attr('src') !== null && $webview.isLoading()) {
        $webview.stop();
      }

      $web.attr('src', url);
      currentVideoTitle = title;
      browser.setTitle(title);
      toggleSearchPlayListAndWebview();

      $searchBox.val("");
      $searchResults.html("");
      $searchResults.css('display', 'none');*/
    },
    handleSearch: function(e) {
      /*var results = [],
        html = [];
      var val = $(this).val().toLowerCase();

      if (val === "") {
        $searchResults.html("");
        $searchResults.css('display', 'none');

        if(recentlyPlayed.length > 0) {
          $recentlyPlayed.css('display', 'block');
        }

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
        });

        $searchResults.css('display', 'block');

        if (recentlyPlayed.length > 0) {
          $recentlyPlayed.css('display', 'none');
        }

        $searchResults.html(html.join(''));

        hookupAnchors("#searchResults");
      }*/
    },
    handleKeyDown: function(e) {
      switch(e.keyCode) {
        case 112: // f1 - toggle between video search and video playback
          this.toggleSearchPlayListAndWebview();
        break;
        case 114: // f3 - restart app
          this.state.browser.reload();
        break;
        case 123: // f12 - toggle dev tools
          this.state.browser.openDevTools();
        break;
      }
    },
    render: function() {
      return (
        <div>
          <div id="searchList" style={this.state.searchListStyle} onChange={this.handleSearch}>
            <input type="text" id="searchBox" placeholder="search for videos..."></input>
            <SearchResults videos={this.state.searchResults} />
            <div id="recentlyPlayed">
              <div id="recentlyPlayedHeader">Recently Played</div>
              <div id="recentlyPlayedList"></div>
            </div>
          </div>
          <webview id="webview" src={this.state.webviewSrc} style={this.state.webviewStyle} httpReferrer="http://youtube.com"></webview> 
        </div>
      );
    }
  });

  my.init = function() {
    // from: http://theoryapp.com/string-startswith-and-endswith-in-javascript/
    if (typeof String.prototype.startsWith !== 'function') {
      String.prototype.startsWith = function(prefix) {
        return this.slice(0, prefix.length) === prefix;
      };
    }
    
    React.render(
        <Toby />,
        document.getElementById('ui')
    );
  };

  return my;
})();

$(document).ready(function() {
  TobyReact.init();
});
