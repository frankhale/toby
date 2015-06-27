//
// Toby - A YouTube player for the desktop
//
// Frank Hale <frankhale@gmail.com>
// 27 June 2015
//
// License: GNU GPL v2

var Toby = (function() {
  'use strict';

  var fs = require('fs'),
    path = require('path'),
    remote = require('remote'),
    shell = require('shell'),
    browser = remote.getCurrentWindow(),
    basePath = __dirname + path.sep,
    dataFilePath = basePath + ["data", "data.json"].join(path.sep),
    recentlyPlayedPath = basePath + ["data", "recent.json"].join(path.sep),
    appTitle = "Toby - A YouTube player for the desktop";

  var server = (function() {
    var my = {},
        listeners = [],
        io = require('socket.io')(),
        socketio;

    my.send = function(type, data) {
      if(socketio!==undefined) {
        socketio.emit(type, data);
      }
    };

    my.on = function(type, func) {
      listeners.push({
        type: type,
        func: func
      });
    };

    var fire = function(type, data) {
      if(!(listeners.length > 0)) return;

      _.forEach(_.where(listeners, { type: type }), function(l) {
        if(data !== undefined && l.func !== undefined) {
         l.func(data);
        } else {
         l.func();
        }
      });
    };

    io.on('connection', function(socket){
      socket.on('video-info', function(data) {
        fire('video-info', data);
      });
      socket.on('youtube-api-ready', function() {
        socketio = socket;
        fire('youtube-api-ready');
      });
      socket.on('youtube-player-state-changed', function(data) {
        fire('youtube-player-state-changed', data);
      });
    });
    io.listen(5150);

    return my;
  })();

  var loadDataFile = function(filepath) {
    try {
      var data = fs.readFileSync(filepath)
      data = JSON.parse(data.toString());

      var rawvideos = _.flatten(_.pluck(data, "videos"));
      var videos = [];

      _.forEach(rawvideos, function(v) {
        videos.push({
          "description": v.description,
          "ytid": v.ytid,
          "url": "http://youtube.com/embed/" + v.ytid
        });
      });

      return {
        videoData: data,
        videos: videos
      };
    } catch (err) {
      return {
        videoData: [],
        videos: []
      };
    }
  };

  var loadRecentlyPlayedFromFile = function(filepath) {
    if(!(fs.existsSync(filepath))) return [];

    try {
      var data = fs.readFileSync(filepath)
      return JSON.parse(data.toString());
    } catch (err) {
      console.log("error loading recently played from file: " + err);
      return [];
    }
  };

  var VideoSearch = React.createClass({displayName: "VideoSearch",
    getInitialState: function() {
      return {
        searchResults: [],
        recentlyPlayedData: loadRecentlyPlayedFromFile(recentlyPlayedPath),
        searchListStyle: {
          display: "block"
        },
        searchResultsStyle: {
          display: "none"
        },
        recentlyPlayedStyle: {
          display: "none"
        },
        webviewStyle: {
          visibility: "hidden" // webview will be garbage collected if set to display:none
        },
        data: loadDataFile(dataFilePath),
        currentVideoSrc: "",
        currentVideoTitle: "",
        currentVideoId: "",
        newVideoNotification: ""
      };
    },
    componentDidMount: function() {
      window.onkeydown = this.handleKeyDown;
      browser.setTitle(appTitle);

      var searchResultsElem = this.refs.searchResults.getDOMNode();
      var searchBoxElem = this.refs.searchBox.getDOMNode();

      var resizeElements = function() {
        var browserSize = browser.getContentSize();
        searchResultsElem.style.height = browserSize[1] - 100 + "px";
        searchBoxElem.style.width = browserSize[0] - 20 + "px";
      };

      resizeElements();

      window.addEventListener('resize', function(e) {
        resizeElements();
      }.bind(this));

      fs.watchFile(dataFilePath, function(curr, prev) {
        this.setState({
          data: loadDataFile(dataFilePath)
        });
      }.bind(this));

      if(this.state.recentlyPlayedData.length > 0) {
        this.setState({
          recentlyPlayedStyle: {
            display: "block"
          }
        });
      }

      // Fix up the recently played so that we can click the link and have it
      // play.
      this.state.recentlyPlayedData = _.forEach(this.state.recentlyPlayedData, function(v) {
        v.playVideo = this.setPlayVideoState(v);
      }.bind(this));
    },
    setPlayVideoState: function(video) {
      return function() {
        server.send('play', video.ytid);

        this.setState({
          currentVideoSrc: video.url,
          webviewStyle: {
           visibility: "visible"
          },
          searchListStyle: {
           display: "none"
          }
        });
      }.bind(this);
    },
    addToRecentlyPlayedList: function(video) {
      var found = _.find(this.state.recentlyPlayedData, function(v) {
        if (video.ytid === v.ytid) {
          return v;
        }
      });

      if (found === undefined) {
         // Might want to make this configurable in the future
         this.state.recentlyPlayedData = _.takeRight(this.state.recentlyPlayedData, 25);
         this.state.recentlyPlayedData.push({
           "description": video.description,
           "url": video.url,
           "ytid": video.ytid,
           "playVideo": this.setPlayVideoState(video)
         });
       }
    },
    handleSearch: function(e) {
      var results = [];
      var searchTermRaw = e.target.value;
      var searchTerm = e.target.value.toLowerCase();

      if (searchTerm.length === 0) {
        this.setState({
          searchResultData: [],
          searchResultsStyle: {
            display: "none"
          }
        });

        if(this.state.recentlyPlayedData.length>0) {
          this.setState({
            recentlyPlayedStyle: {
              display: "block"
            }
          });
        }

        return;
      }

      if (searchTerm === "%all%") {
        results = this.state.data.videos.slice(0);
      } else if (searchTerm.charAt(0) === "%" && searchTerm.slice(-1) === "%") {
        var videoGroup = _.find(this.state.data.videoData, function(g) {
          return searchTerm === "%" + g.title.toLowerCase() + "%";
        });

        if (videoGroup !== undefined) {
          results = videoGroup.videos.slice(0);
        }
      } else {
        results = _.filter(this.state.data.videos, function(v) {
          return v.description.toLowerCase().includes(searchTerm);
        });
      }

      // We're pushing it here and trusting that a user will enter a valid
      // YouTube video ID.
      if (results.length === 0 && !searchTerm.startsWith("%")) {
        results.push({
          "description": "Play video with ID: " + searchTermRaw,
          "url": "https://www.youtube.com/embed/" + searchTermRaw,
          "ytid": searchTermRaw
        });
      }

      if (results.length > 0) {
        this.setState({
          searchResults: results,
          searchResultsStyle: {
            display: "block"
          },
          recentlyPlayedStyle: {
            display: "none"
          }
        });
      } else {
        this.setState({
          searchResultsStyle: {
            display: "none"
          }
        });

        if (this.state.recentlyPlayedData.length > 0) {
          recentlyPlayedStyle.display = "flex";
        }
      }
    },
    clearSearchBox: function() {
      var searchBoxElem = this.refs.searchBox.getDOMNode();
      if (searchBoxElem.value.length > 0) {
        searchBoxElem.value = '';
      }
    },
    handleClick: function(e) {
      var url = e.target.dataset.url + "?autoplay=1",
          title = e.target.text,
          ytid = e.target.dataset.ytid;

      this.addToRecentlyPlayedList({
        'description': title,
        'url': url,
        'ytid': ytid
      });

      server.send('play', ytid);

      this.setState({
        searchResults: [],
        currentVideoSrc: url,
        currentVideoTitle: title,
        currentVideoId: ytid,
        searchListStyle: {
         display: "none"
        },
        searchResultsStyle: {
         display: "none"
        },
        recentlyPlayedStyle: {
          display: "block"
        },
        webviewStyle: {
         visibility: "visible"
       }
      });

      this.clearSearchBox();

    },
    handleKeyDown: function(e) {
      switch (e.keyCode) {
        case 112: // f1 - toggle between video search and video playback
          this.toggleSearchPlayListAndWebview();
          break;
        case 116: // f5 - add current video to data.json
          this.addCurrentVideoToDataJson();
          break;
        case 121: // f10 - restart app
          browser.reload();
          break;
        case 123: // f12 - toggle dev tools
          browser.openDevTools();
          break;
      }
    },
    toggleSearchPlayListAndWebview: function(description) {
      if(this.state.currentVideoSrc === '') return;

      if(this.state.searchListStyle.display === "block") {
        this.setState({
          searchListStyle: {
            display: "none"
          },
          searchResultsStyle: {
            display: "none"
          },
          webviewStyle: {
            visibility: "visible"
          }
        });
        browser.setTitle(this.state.currentVideoTitle);
        this.clearSearchBox();
      } else {
        var recentlyPlayedListStyle = "none";
        if(this.state.recentlyPlayedData.length>0) {
          recentlyPlayedListStyle = "block";
        }

        this.setState({
          searchListStyle: {
            display: "block"
          },
          recentlyPlayedStyle: {
            display: recentlyPlayedListStyle
          },
          webviewStyle: {
            visibility: "hidden"
          }
        });
        
        browser.setTitle(appTitle);
      }
    },
    addCurrentVideoToDataJson: function() {
      // At the end of a video a list of other videos is displayed. If a user
      // clicks on one of these videos let's allow them to add that video if
      // they like it to their data.json file.
      //
      // We'll add it to a group called 'misc' for the time being

      var videoData = this.state.data.videoData.slice(0);

      if(this.state.currentVideoSrc === '' ||
         this.state.currentVideoTitle === '' ||
         this.state.currentVideoId === '') return;

      var newEntry = {
        "description": this.state.currentVideoTitle,
        "ytid": this.state.currentVideoId
      }

      var miscGroup = _.find(videoData, function(d) {
         return d.title === "misc";
      });

      if(miscGroup === undefined) {
        var miscGroup = {
          title: "misc",
          videos: []
        };

        videoData.push(miscGroup);
      }

      var found = _.find(this.state.data.videos, function(v) {
         return v.ytid === newEntry.ytid;
      });

      if (found === undefined) {
        miscGroup.videos.push(newEntry);

        var videoData = _.filter(videoData, function(d) {
          return d.title !== "misc";
        });

        videoData.push(miscGroup);

        this.setState({
          newVideoNotification: "Added: " + newEntry.description
        });

        // Clear out new video notification message so that any subsequent renders
        // won't cause the notifiation component to display again for the same
        // message.
        setTimeout(function(){
          this.setState({
            newVideoNotification: ""
          });
        }.bind(this), 1000);
      }

      fs.writeFile(dataFilePath, JSON.stringify(videoData, undefined, 2), function(err) {
        if (err) throw err;
      });
    },
    updateTitle: function(newTitle, ytid) {
      this.setState({
        currentVideoTitle: newTitle,
        currentVideoId: ytid
      });

      // if a user plays a video based on a YouTube ID we need to replace the
      // placeholder title in recentlyPlayedData with the proper title.
      var recentlyPlayedVideo = _.find(this.state.recentlyPlayedData, { "ytid" : ytid });

      if(recentlyPlayedVideo !== undefined) {
        recentlyPlayedVideo.description = newTitle;

        // remove "?autoplay=1" from all urls
        this.state.recentlyPlayedData = _.forEach(this.state.recentlyPlayedData, function(rp) {
          return rp.url =  rp.url.replace("?autoplay=1", "");
        });

        fs.writeFile(recentlyPlayedPath, JSON.stringify(this.state.recentlyPlayedData, undefined, 2), function(err) {
          if (err) throw err;
        });
      } else {
        // If we didn't find the recently played video in our list then it may
        // be that a video was clicked on from suggestions made by YouTube after
        // a video that we know about was played. If this is the case lets add
        // the video to the recently played list.
        this.addToRecentlyPlayedList({
         'description': newTitle,
         'url': "http://youtube.com/embed/" + ytid,
         'ytid': ytid
        });
      }
    },
    render: function() {
      var bindClick = this.handleClick.bind(this);
      return (
        React.createElement("div", {id: "main-content"}, 
          React.createElement("div", {id: "searchList", ref: "searchList", style: this.state.searchListStyle}, 
            React.createElement("input", {type: "text", ref: " searchBox", id: "searchBox", ref: "searchBox", placeholder: "search videos or enter youtube id...", onChange: this.handleSearch}), 
            React.createElement("div", {id: "searchResults", ref: "searchResults", style: this.state.searchResultsStyle}, 
              this.state.searchResults.sort(function(a, b) {
                if (a.description < b.description) return -1;
                if (a.description > b.description) return 1;
                return 0;
              })
              .map(function(r) {
                return (
                  React.createElement("span", null, 
                    React.createElement("a", {href: "#", "data-url": r.url, "data-ytid": r.ytid, onClick: bindClick}, r.description), React.createElement("br", null)
                  )
                );
              })
            
            ), 
            React.createElement(RecentlyPlayedList, {data: this.state.recentlyPlayedData, style: this.state.recentlyPlayedStyle})
          ), 
          React.createElement(VideoPlayback, {src: this.state.currentVideoSrc, title: this.state.currentVideoTitle, style: this.state.webviewStyle, updateTitle: this.updateTitle}), 
          React.createElement(Notification, {message: this.state.newVideoNotification})
        )
      );
    }
  });

  var RecentlyPlayedList = React.createClass({displayName: "RecentlyPlayedList",
    componentDidMount: function() {
      window.addEventListener('resize', function(e) {
        this.resize();
      }.bind(this));

      this.resize();
    },
    resize: function() {
      var browserSize = browser.getContentSize(),
          recentlyPlayed = this.refs.recentlyPlayed.getDOMNode(),
          recentlyPlayedList = this.refs.recentlyPlayedList.getDOMNode();
      recentlyPlayed.style.width = browserSize[0] - 30 + "px";
      recentlyPlayedList.style.height = browserSize[1] - 126 + "px";
    },
    render: function() {
      return (
        React.createElement("div", {id: "recentlyPlayed", ref: "recentlyPlayed", style: this.props.style}, 
          React.createElement("div", {id: "recentlyPlayedHeader"}, "Recently Played"), 
          React.createElement("div", {id: "recentlyPlayedList", ref: "recentlyPlayedList"}, 
            this.props
              .data
              .sort(function(a, b) {
                if (a.description < b.description) return -1;
                if (a.description > b.description) return 1;
                return 0;
              })
              .map(function(r) {
                return (
                  React.createElement("span", null, 
                    React.createElement("a", {href: "#", "data-url": r.url, onClick: r.playVideo}, r.description), React.createElement("br", null)
                  )
                )
              })
            
          )
        )
      );
    }
  });

  var VideoPlayback = React.createClass({displayName: "VideoPlayback",
    componentDidMount: function() {
      var webview = this.refs.webview.getDOMNode();

      // We don't need to set the httpreferrer here anymore because it only
      // works for loading the source of the webview. It's not passed along
      // for subsequent url loads (eg. by clicking links inside the webview).
      //
      // I've made a patch to libchromiumcontent to override the referrer so
      // that every request that gets made has the referrer overridden.
      //
      // The reason to override the referrer is so we can look like we are
      // playing from the web and videos from VEVO for instance will not be
      // blocked from playback.
      //
      //webview.httpreferrer = "http://www.youtube.com";

      webview.addEventListener("new-window", function(e) {
        shell.openExternal(e.url);
      });

      server.on('video-info', function(data) {
        browser.setTitle(data.title);

        if(this.state.updateTitle !== undefined) {
          this.state.updateTitle(data.title, data.video_id);
        }
      }.bind(this));

      //server.on('youtube-player-state-changed', function(data) {
      //  console.log('youtube-player-state-changed');
      //  console.log(data);
      //});

      setInterval(function() {
        if (webview.style.visibility === "visible") {
          webview.send('ping');
        }
      }.bind(this), 1000);
    },
    componentWillReceiveProps: function(nextProps) {
     if(this.props.updateTitle !== undefined) {
       this.setState({
         updateTitle: this.props.updateTitle
       });
     }
    },
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("webview", {id: "webview", ref: "webview", src: "./player.html", style: this.props.style})
        )
      );
    }
  });

  var Notification = React.createClass({displayName: "Notification",
    getInitialState: function() {
      return {
        notificationStyle: {
          display: "none"
        },
        message: this.props.message
      };
    },
    componentWillReceiveProps: function(nextProps) {
      if(nextProps.message.length > 0) {
        this.setState({
          notificationStyle: {
            display: "block"
          },
          message: nextProps.message
        });

        setTimeout(function() {
          this.setState({
            notificationStyle: {
              display: "none"
            },
            message: ""
          });
        }.bind(this), 2500);
      }
    },
    render: function() {
      return (
        React.createElement("div", {id: "notification", style: this.state.notificationStyle}, this.state.message)
      );
    }
  });

  return {
    init: function() {
      //console.log("iojs version: " + process.version);
      React.render(React.createElement(VideoSearch, null), document.getElementById('ui'));

      server.on('youtube-api-ready', function() {
        var $mc = $("#main-content");
        $mc.css('visibility', 'visible');

        $("#loading").fadeOut("fast");
        $mc.hide().fadeIn("slow");
      });
    }
  };
})();

$(document).ready(function() {
  Toby.init();
});
