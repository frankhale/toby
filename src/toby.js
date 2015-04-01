//
// Toby - A tiny personal YouTube player for the desktop
//
// NOTE: I have not compiled my JSX because I've hacked the JSXTransformer.js
//       to not barf on Atom-Shell's webview tag. I'm just not interested ATM
//       to try to figure out another way to use the webview tag. I really like
//       the JSX syntax and I think it works well to describe what is going on.
//       Because of this I cannot compile the JSX because the JSX compiler will
//       barf when it finds the webview tag.
//
// Frank Hale <frankhale@gmail.com>
// 3 February 2015
//

"use strict";

var TobyReact = (function() {
  var my = {};

  var fs = require('fs'),
  path = require('path'),
  remote = require('remote'),
  shell = require('shell');

  var SearchResultsList = React.createClass({
    getInitialState: function() {
      return {
        recentlyPlayedStyle: {
          display: "none"
        },
        recentlyPlayedData: [],
        searchResults: $("#searchResults"),
        browser: remote.getCurrentWindow()
      };
    },
    componentDidMount: function() {
      this.setState({ 
        searchResults: $("#searchResults") 
      });

      window.onresize = function(e) {
        this.state.searchResults.css('height', this.state.browser.getSize()[1] - 155 + "px");
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

      this.state.searchResults.css('display', 'none');
      this.props.playVideo(description, url);
    },
    render: function() {
      var bindClick = this.handleClick.bind(this);
      var searchResultsStyle = { display: "none" };
      var recentlyPlayedStyle = { display: "none" };

      if(this.props.data.length > 0) {
        searchResultsStyle.display = "block";
        recentlyPlayedStyle.display = "none"; 
      } else {
        searchResultsStyle.display = "none";
        
        if(this.state.recentlyPlayedData.length > 0) {
          recentlyPlayedStyle.display = "flex";       
        }
      }

      return (
        <div>
          <div id="searchResults" style={searchResultsStyle}>
            {this.props
              .data
              .sort(function(a, b) {
                if(a.description < b.description) return -1;
                if(a.description > b.description) return 1;
                return 0;
            })
            .map(function(r) {
              return <span><a href='#' data-url={r.url} onClick={bindClick}>{r.description}</a><br /></span>
            })}
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
                   if(a.description < b.description) return -1;
                   if(a.description > b.description) return 1;
                   return 0;
            })
            .map(function(r) {
              return <span><a href='#' data-url={r.url} onClick={r.playVideo}>{r.description}</a><br /></span>
            })}
          </div>
        </div>
      );
    }
  });

  var Toby = React.createClass({
    getInitialState: function() {
      return {
        browser: remote.getCurrentWindow(),
        //dataFilePathParts: ["resources", "app", "data", "data.json"],
        dataFilePath: __dirname + path.sep + ["data", "data.json"].join(path.sep),
        searchPlayListTitle: "Toby - Video Search",
        searchResultData: [],
        blankHtml: 'file://' + __dirname + '/blank.html',
        webviewSrc: 'file://' + __dirname + '/blank.html',
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

      this.state.browser.setTitle(this.state.searchPlayListTitle);
      this.loadDataFile(function(data) {
        this.setState({
          videoData: data,
          videos: _.flatten(_.pluck(data, "videos"))
        });
      }.bind(this));

      this.setState({
        body: $("body"),
        searchBox: $("#searchBox"),
        searchList: $("#searchList"), 
        web: $("#webview"),
        webview: $("#webview")[0]
      });

      $("#browser-plugin-1").css("background-color", "#000");

      this.state.web.attr("httpreferrer", "http://youtube.com");
      this.state.webview.addEventListener("new-window", function(e) {
        shell.openExternal(e.url);
      });
      this.state.webview.addEventListener("ipc-message", function(e) {
        if(e.channel != "" && this.state.currentVideoTitle !== e.channel) {
          this.state.browser.setTitle(e.channel.title);
          this.setState({
            currentVideoTitle: e.channel.title,
            currentVideoUrl: e.channel.url
          });
        }
      }.bind(this));

      setInterval(function() {
        if(this.state.web.css("visibility") === "visible") {
          this.state.webview.send('ping');
        }
      }.bind(this), 1000);

      fs.watchFile(this.state.dataFilePath, function(curr, prev) {
        this.loadDataFile(function(data) {
          this.setState({
            videoData: data,
            videos: _.flatten(_.pluck(data, "videos"))
          });
        }.bind(this));
      }.bind(this));
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
      if (this.state.web.attr("src") === this.state.blankHtml) {
        return;
      }

      if (this.state.web.css("visibility") === "hidden") {
        if(this.state.searchBox.val().length > 0) {
          this.state.searchBox.val('');
        }

        this.setState({ 
          searchListStyle: { display: "none" },
          webviewStyle: { visibility: "visible" }
        });

        if(description === undefined) {
          if(this.state.currentVideoTitle !== undefined && 
             this.state.currentVideoTitle !== "") {
            this.state.browser.setTitle(this.state.currentVideoTitle);
          }
        }
      } else {
        this.state.browser.setTitle(this.state.searchPlayListTitle);
        this.setState({
          searchResultData: [], 
          searchListStyle: { display: "block" },
          webviewStyle: { visibility: "hidden" }
        });
      }
    },
    playVideo: function(description, url) {
      if (this.state.web.attr('src') !== null && this.state.webview.isLoading()) {
        this.state.webview.stop();
      }

      this.setState({ 
        currentVideoTitle: description,
        searchResultData: []
      });

      this.state.browser.setTitle(description);

      if(url !== undefined) {
        if(!(url.startsWith("http"))) {
          url = "http://" + url;
        }

        this.state.web.attr("src", url);
      }

      this.toggleSearchPlayListAndWebview(description);
    },
    handleSearch: function(e) {
      var results = [];
      var searchTerm = e.target.value.toLowerCase();

      if(searchTerm.length === 0) {
        this.setState({
          searchResultData: []//,
        });
        return;
      }

      if(searchTerm === "%all%") {
        console.log(this.state.videos);
        results = this.state.videos.slice(0);
      } else if(searchTerm.charAt(0) === "%" && searchTerm.slice(-1) === "%") {
        var videoGroup = _.find(this.state.videoData, function(g) {
          return searchTerm === "%" + g.title.toLowerCase() + "%";
        });

        if(videoGroup !== undefined) {
          results = videoGroup.videos.slice(0);
        }
      } else {
        results = _.filter(this.state.videos, function(v) {
          return v.description.toLowerCase().startsWith(searchTerm);
        });
      }

      if(results.length > 0) {
        this.setState({
          searchResultData: results//,
        });
      }
      else {
        this.setState({
          searchResultData: results//,
        });
      }
    },
    addCurrentVideoToDataJson: function() {
      // At the end of a video a list of other videos is displayed. If a user
      // clicks on one of these videos let's allow them to add that video if 
      // they like it to their data.json file.
      //
      // We'll add it to a group called 'unlisted' for the time being
      //
      // The format of the currentVideoUrl is:  
      //  https://www.youtube.com/watch?v=-zkrQMjlD3A
      //
      // There is an edge case here that I think we'll just have to swallow.
      // The way I expect the data.json to be is this. You go to YouTube find
      // the vidoes you like, copy the title and the embed URL and add it to
      // the data.json. When we get here the title is coming directly from
      // YouTube which seems to be slightly different on occasion that the 
      // title copied directly from the YouTube webpage. This can cause you to 
      // be able to add the video again when you already have it.
      //
      // This format is directly from the YouTube player in the webview
      // and not the Url that is in the data.json.
      var currentVideoUrl = this.state.currentVideoUrl;

      if(currentVideoUrl !== undefined) {
        var videoId = currentVideoUrl.split("?v=")[1];
        if(videoId !== undefined) {
          var videoData = this.state.videoData.slice(0);

          var newEntry = {
            "description": this.state.currentVideoTitle,
            "url": "http://www.youtube.com/embed/" + videoId
          }

          var miscGroup = _.find(videoData, function(d) {
            return d.title === "misc";
          });

          var found = _.find(this.state.videos, function(v) {
            return v.description === newEntry.description;
          });

          if(found === undefined) {
            if(miscGroup !== undefined) {
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

            // I'm not going to set the state here because I have a FS watcher
            // that will do it. Let's just write to the data.json directly.
            fs.writeFile('./resources/app/data/data.json', JSON.stringify(videoData, undefined, 2), function (err) {
              if (err) throw err;
            });
          }
        }
      } 
    },
    handleKeyDown: function(e) {
      switch(e.keyCode) {
        case 112: // f1 - toggle between video search and video playback
          this.toggleSearchPlayListAndWebview();
        break;
        case 114: // f3 - restart app
          this.state.browser.reload();
        break;
        case 116: // f5 - add current video to data.json
          this.addCurrentVideoToDataJson();
        break;
        case 123: // f12 - toggle dev tools
          this.state.browser.openDevTools();
        break;
      }
    },
    render: function() {
      return (
        <div>
          <div id="searchList" style={this.state.searchListStyle}>
            <input type="text" id="searchBox" placeholder="search for videos..." onChange={this.handleSearch}></input>
            <SearchResultsList data={this.state.searchResultData} playVideo={this.playVideo} />
          </div> 
          <div>
            <webview id="webview" preload="./src/ping.js" src={this.state.webviewSrc} style={this.state.webviewStyle}></webview> 
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
