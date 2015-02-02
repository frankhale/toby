//
// Toby - A tiny personal YouTube player for the desktop
//
// Status: This is a work in progress, this is a rewrite using React.js.
//
// Frank Hale <frankhale@gmail.com>
// 1 February 2015
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
      this.setState({ 
        searchResults: $("#searchResults") 
      });
    },
    componentDidUpdate: function() {
      if(this.props.data.length > 0) {
        this.state.searchResults.css('display', 'block');
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
    addToRecentlyPlayedList: function(v) {
      var found = _.find(this.state.recentlyPlayedData, function(video) {
        if (video.title === v.title) {
          return v;
        }
      });

      if (found === undefined) {
        var recentlyPlayed = this.state.recentlyPlayedData;
        v.playVideo = function() {
          this.props.playVideo(v.title, v.url);
        }.bind(this);
        recentlyPlayed.push(v);
        this.setState({ 
          recentlyPlayedData: recentlyPlayed
        });
      }
    },
    handleClick: function(e) {
      var url = e.target.dataset.url + "?autoplay=1",
          title = e.target.text;

      this.addToRecentlyPlayedList({
        'title': title,
        'url': url
      });
          
      this.state.searchResults.css('display', 'none');
      this.props.playVideo(title, url);
    },
    render: function() {
      var bindClick = this.handleClick.bind(this);
    
      return (
        <div>
          <div id="searchResults">
            {this.props.data.map(function(r) {
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
            {this.props.data.map(function(r) {
              return <span><a href='#' data-url={r.url} onClick={r.playVideo}>{r.title}</a><br /></span>
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
        currentVideoTitle: "",
        searchResultData: [],
        webviewSrc: "about:blank",
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
        this.setState({videoData: data});
      }.bind(this));

      this.setState({
        body: $("body"),
        searchBox: $("#searchBox"),
        searchList: $("#searchList"),
        web: $("#webview"),
        webview: $("#webview")[0]
      });
      
      this.state.web.attr('httpReferrer', "http://youtube.com");
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
    toggleSearchPlayListAndWebview: function(title, url) {      
      if(url !== undefined) {
        this.state.web.attr('src', url);
      }
     
      if (this.state.web.attr('src') === 'about:blank') {
        return;
      }

      if (this.state.web.css('visibility') === 'hidden') {
        if(this.state.searchBox.val().length > 0) {
          this.state.searchBox.val('');
        }
        
        this.setState({ 
          searchListStyle: { display: "none" },
          webviewStyle: { visibility: "visible" }
        });

        this.state.browser.setTitle(this.state.currentVideoTitle);
      } else {
        this.state.browser.setTitle(this.state.searchPlayListTitle);
        this.setState({ 
          searchListStyle: { display: "block" },
          webviewStyle: { visibility: "hidden" }
        });
      }
    },
    playVideo: function(title, url) {
      if (this.state.web.attr('src') !== null && this.state.webview.isLoading()) {
        this.state.webview.stop();
      }

      this.setState({ 
          currentVideoTitle: title,
          searchResultData: []
      });

      this.state.browser.setTitle(title);
      this.toggleSearchPlayListAndWebview(title, url);
    },
    handleSearch: function(e) {
      if(e.target.value.length === 0) {
        this.setState({searchResultData: []});
        return;
      }

      var results = [];

      _.forEach(this.state.videoData, function(g) {
        if (g.title !== undefined && g.videos !== undefined) {
          _.forEach(g.videos, function(v) {
            if (v.description.toLowerCase().startsWith(e.target.value.toLowerCase())) {
              results.push(v);
            }
          });
        }
      });

      this.setState({searchResultData: results});
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
            <SearchResultsList data={this.state.searchResultData} playVideo={this.playVideo} />
          </div> 
         <div>
            <webview id="webview" src={this.state.webviewSrc} style={this.state.webviewStyle}></webview> 
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
