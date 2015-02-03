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
        this.resizeSearchResults();
      }.bind(this);
    },
    componentDidUpdate: function() {
      if(this.props.data.length > 0) {
        this.state.searchResults.css('display', 'block');
        this.resizeSearchResults();
      } else {
        this.state.searchResults.css('display', 'none');
      }
    },
    componentWillReceiveProps: function(nextProps) {
      if(nextProps.data.length > 0) {
        this.setState({ 
          recentlyPlayedStyle: { display: "none" }
        });
      } else if (this.state.recentlyPlayedData.length > 0) {
        this.setState({ 
          recentlyPlayedStyle: { display: "block" }
        });
      }
    },
    resizeSearchResults: function() {
      this.state.searchResults.css('height', this.state.browser.getSize()[1] - 155 + "px");
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

      return (
        <div style={this.props.style}>
          <div id="searchResults">
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
          <RecentlyPlayedList data={this.state.recentlyPlayedData} style={this.state.recentlyPlayedStyle} />
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
        dataFilePathParts: ["resources", "app", "data", "data.json"],
        dataFilePath: process.cwd() + path.sep + ["resources", "app", "data", "data.json"].join(path.sep),
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
          this.setState({currentVideoTitle: e.channel});
          this.state.browser.setTitle(e.channel);
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
    toggleSearchPlayListAndWebview: function(description, url) {      
      if(url !== undefined) {
        this.state.web.attr("src", url);
      }
     
      if (this.state.web.attr("src") === this.state.blankHtml) {
        return;
      }

      if (this.state.web.css("visibility") === "hidden") {
        if(this.state.searchBox.val().length > 0) {
          this.state.searchBox.val('');
        }
        
        this.setState({ 
          searchListStyle: { display: "none" },
          searchResultsStyle: { display: "none" },
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
      this.toggleSearchPlayListAndWebview(description, url);
    },
    handleSearch: function(e) {
      var results = [];
      var searchTerm = e.target.value.toLowerCase();
      
      if(searchTerm.length === 0) {
        this.setState({searchResultData: []});
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
          searchResultData: results,
          searchResultsStyle: { display: "block" }
        });
      }
      else {
        this.setState({searchResultData: results});
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
            <SearchResultsList data={this.state.searchResultData} playVideo={this.playVideo} style={this.state.searchResultsStyle} />
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
