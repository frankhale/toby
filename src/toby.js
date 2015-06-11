//
// Toby - A tiny personal YouTube player for the desktop
//
// Frank Hale <frankhale@gmail.com>
// 11 June 2015
//
// License: GNU GPL v2

var TobyReact = (function() {
  'use strict';

  var my = {};

  var fs = require('fs'),
      path = require('path'),
      remote = require('remote'),
      shell = require('shell'),
      browser = remote.getCurrentWindow();

  var SearchResultsList = React.createClass({
    getInitialState: function() {
      return {
        recentlyPlayedStyle: {
          display: "none"
        },
        recentlyPlayedData: []
      };
    },
    componentDidMount: function() {
      window.onresize = function(e) {
        this.refs.searchResults.getDOMNode().style.height = browser.getSize()[1] - 155 + "px";
      }.bind(this);
    },
    addToRecentlyPlayedList: function(v) {
      var found = _.find(this.state.recentlyPlayedData, function(video) {
        if (video.description === v.description) {
          return v;
        }
      });

      if (found === undefined) {
        var recentlyPlayed = this.state.recentlyPlayedData;
        v.playVideo = function() {
          this.props.playVideo(v.description, v.url);
        }.bind(this);
        recentlyPlayed.push(v);
        this.setState({
          recentlyPlayedData: recentlyPlayed
        });
      }
    },
    handleClick: function(e) {
      var url = e.target.dataset.url + "?autoplay=1",
        description = e.target.text;

      this.addToRecentlyPlayedList({
        'description': description,
        'url': url
      });

      this.refs.searchResults.getDOMNode().style.display = 'none';
      this.props.playVideo(description, url);
    },
    render: function() {
      var bindClick = this.handleClick.bind(this);
      var searchResultsStyle = {
        display: "none"
      };
      var recentlyPlayedStyle = {
        display: "none"
      };

      if (this.props.data.length > 0) {
        searchResultsStyle.display = "block";
        recentlyPlayedStyle.display = "none";
      } else {
        searchResultsStyle.display = "none";

        if (this.state.recentlyPlayedData.length > 0) {
          recentlyPlayedStyle.display = "flex";
        }
      }

      return (
        <div>
          <div id="searchResults" ref="searchResults" style={searchResultsStyle}>
            {this.props.data
              .sort(function(a, b) {
                if (a.description < b.description) return -1;
                if (a.description > b.description) return 1;
                return 0;
              })
              .map(function(r) {
                return (
                  <span>
                    <a href='#' data-url={r.url} onClick={bindClick}>{r.description}</a><br/>
                  </span>
                );
              })
            }
          </div>
          <RecentlyPlayedList data={this.state.recentlyPlayedData} style={recentlyPlayedStyle} />
        </div>
      );
    }
  });

  var RecentlyPlayedList = React.createClass({
    componentDidMount: function() {
      var style = this.props.recentlyPlayedStyle;

      this.setState({
        recentlyPlayed: $("#recentlyPlayed")
      });
    },
    render: function() {
      return (
        <div id="recentlyPlayed" style={this.props.style}>
          <div id="recentlyPlayedHeader">Recently Played</div>
          <div id="recentlyPlayedList">
            {this.props
              .data
              .sort(function(a, b) {
                if (a.description < b.description) return -1;
                if (a.description > b.description) return 1;
                return 0;
              })
              .map(function(r) {
                return (
                  <span>
                    <a href='#' data-url={r.url} onClick={r.playVideo}>{r.description}</a>
                    <br/>
                  </span>
                )
              })
            }
          </div>
        </div>
      );
    }
  });

  var Toby = React.createClass({
    getInitialState: function() {
      return {
        dataFilePath: __dirname + path.sep + ["data", "data.json"].join(path.sep),
        searchPlayListTitle: "Toby - Video Search",
        searchResultData: [],
        webviewSrc: "",
        searchListStyle: {
          display: "block"
        },
        webviewStyle: {
          visibility: "hidden"
        }
      };
    },
    componentDidMount: function() {
      window.onkeydown = this.handleKeyDown;

      var massageData = function(data) {
        var rawvideos = _.flatten(_.pluck(data, "videos"));
        var videos =  [];

        _.forEach(rawvideos, function(v){
          videos.push({
            "description": v.description,
            "ytid": v.ytid,
            "url": "http://youtube.com/embed/" + v.ytid
          });
        });

        this.setState({
          videoData: data,
          videos: videos
        });
      }.bind(this);

      this.loadDataFile(function(data) {
        massageData(data);
      }.bind(this));

      fs.watchFile(this.state.dataFilePath, function(curr, prev) {
        this.loadDataFile(function(data) {
          massageData(data);
        });
      }.bind(this));

      var webview = this.refs.webview.getDOMNode();

      webview.httpreferrer = "http://youtube.com";
      webview.addEventListener("new-window", function(e) {
        shell.openExternal(e.url);
      });
      webview.addEventListener("ipc-message", function(e) {
        if (e.channel !== "" && this.state.currentVideoTitle !== e.channel) {
          browser.setTitle(e.channel.title);
          this.setState({
            currentVideoTitle: e.channel.title,
            currentVideoId: e.channel.ytid
          });
        }
      }.bind(this));

      setInterval(function() {
        if (webview.style.visibility === "visible") {
          webview.send('ping');
        }
      }.bind(this), 1000);
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
    toggleSearchPlayListAndWebview: function(description) {
      var webview = this.refs.webview.getDOMNode();
      var searchBox = this.refs.searchBox.getDOMNode();

      if (webview.src === "") return;

      if (webview.style.visibility === "hidden") {
        if (searchBox.value.length > 0) {
          searchBox.value = '';
        }

        this.refs.searchList.getDOMNode().style.display = 'none';

        var showWebview = setInterval(function() {
          if(!webview.isLoading()) {
            this.setState({
              searchListStyle: {
                display: "none"
              },
              webviewStyle: {
                visibility: "visible"
              }
            });

            if (description === undefined) {
              if (this.state.currentVideoTitle !== undefined &&
                this.state.currentVideoTitle !== "") {
                browser.setTitle(this.state.currentVideoTitle);
              }
            }
            clearInterval(showWebview);
          }
        }.bind(this));
      } else {
        browser.setTitle(this.state.searchPlayListTitle);
        this.setState({
          searchResultData: [],
          searchListStyle: {
            display: "block"
          },
          webviewStyle: {
            visibility: "hidden"
          }
        });
      }
    },
    playVideo: function(description, url) {
      var webview = this.refs.webview.getDOMNode();

      //webview.openDevTools();

      if (webview.src !== null && webview.isLoading()) {
        webview.stop();
      }

      this.setState({
        currentVideoTitle: description,
        searchResultData: []
      });

      browser.setTitle(description);

      if (url !== undefined && url !== "") {
          webview.src = url;
      }

      this.toggleSearchPlayListAndWebview(description);
    },
    handleSearch: function(e) {
      var results = [];
      var searchTermRaw = e.target.value;
      var searchTerm = e.target.value.toLowerCase();

      if (searchTerm.length === 0) {
        this.setState({
          searchResultData: []
        });
        return;
      }

      if (searchTerm === "%all%") {
        results = this.state.videos.slice(0);
      } else if (searchTerm.charAt(0) === "%" && searchTerm.slice(-1) === "%") {
        var videoGroup = _.find(this.state.videoData, function(g) {
          return searchTerm === "%" + g.title.toLowerCase() + "%";
        });

        if (videoGroup !== undefined) {
          results = videoGroup.videos.slice(0);
        }
      } else {
        results = _.filter(this.state.videos, function(v) {
          return v.description.toLowerCase().startsWith(searchTerm);
        });
      }

      // We're pushing it here and trusting that a user will enter a valid
      // YouTube video ID.
      if(results.length === 0) {
        results.push({
          "description": "Send ID to YouTube",
          "url": "https://www.youtube.com/embed/" + searchTermRaw
        });
      }

      this.setState({
        searchResultData: results
      });
    },
    addCurrentVideoToDataJson: function() {
      // At the end of a video a list of other videos is displayed. If a user
      // clicks on one of these videos let's allow them to add that video if
      // they like it to their data.json file.
      //
      // We'll add it to a group called 'misc' for the time being
      var videoData = this.state.videoData.slice(0);

      //TODO: Need to add capability to avoid duplicate entries

      if(this.state.webviewSrc === '' &&
         this.state.currentVideoId === '') return;

      var newEntry = {
        "description": this.state.currentVideoTitle,
        "ytid": this.state.currentVideoId
      }

      var miscGroup = _.find(videoData, function(d) {
        return d.title === "misc";
      });

      var found = _.find(this.state.videos, function(v) {
        return v.description === newEntry.description;
      });

      if (found === undefined) {
        if (miscGroup !== undefined) {
          miscGroup.videos.push(newEntry);

          var videoData = _.filter(videoData, function(d) {
            return d.title !== "misc";
          });

          videoData.push(miscGroup);
        } else {
          var miscGroup = {
            title: "misc",
            videos: [newEntry]
          };

          videoData.push(miscGroup);
        }

        fs.writeFile(this.state.dataFilePath, JSON.stringify(videoData, undefined, 2), function(err) {
          if (err) throw err;
        });
      }
    },
    handleKeyDown: function(e) {
      switch (e.keyCode) {
        case 112: // f1 - toggle between video search and video playback
          this.toggleSearchPlayListAndWebview();
          break;
        case 114: // f3 - restart app
          browser.reload();
          break;
        case 116: // f5 - add current video to data.json
          this.addCurrentVideoToDataJson();
          break;
        case 123: // f12 - toggle dev tools
          browser.openDevTools();
          break;
      }
    },
    render: function() {
      return (
        <div>
          <div id="searchList" ref="searchList" style={this.state.searchListStyle}>
            <input type="text" id="searchBox" ref="searchBox" placeholder="search videos or enter youtube id..." onChange={this.handleSearch}></input>
            <SearchResultsList data={this.state.searchResultData} playVideo={this.playVideo} />
          </div>
          <div>
            <webview id="webview" ref="webview" preload="./src/ping.js" src={this.state.webviewSrc} style={this.state.webviewStyle}></webview>
          </div>
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

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    if (typeof String.prototype.endsWith !== 'function') {
      String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, str.length - suffix.length) !== -1;
      }
    }

    React.render(<Toby />, document.getElementById('ui'));
  };

  return my;
})();

$(document).ready(function() {
  TobyReact.init();
});
