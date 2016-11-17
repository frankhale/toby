// toby-ui.js - Front end code for Toby
// Copyright (C) 2016 Frank Hale <frankhale@gmail.com>
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

const appTitle = "Toby - A Simple YouTube Player";

class TobyUI extends React.Component {
  constructor() {
    super();

    this.onCommandEntered = this.onCommandEntered.bind(this);
    this.addVideoButtonHandler = this.addVideoButtonHandler.bind(this);
    this.updateVideoButtonHandler = this.updateVideoButtonHandler.bind(this);
    this.deleteVideoButtonHandler = this.deleteVideoButtonHandler.bind(this);

    this.state = {
      videoData: [],
      searchResults: [],
      applyFilter: "",
      currentVideo: "",
      gridView: false,
      manage: false
    };
  }
  performSearch(searchTerm) {
    $.post({
      url: "/api/videos/search",
      data: { searchTerm: searchTerm }
    })
    .done(function(data) {
      this.setState({
        searchResults: this.buildVideoResults(data),
        manage: false
      });
    }.bind(this));
  }
  onCommandEntered(searchTerm) {
    let commandSegments = searchTerm.split(" ");
    let command = commandSegments[0];

    switch(command) {
      // case "/videos":
      //   $.ajax({
      //     url: '/api/videos'
      //   }).done(function(data) {
      //     console.log(data);
      //   });
      //   break;
      // case "/groups":
      //   $.ajax({
      //     url: '/api/videos/groups'
      //   }).done(function(data) {
      //     console.log(data);
      //   });
      //   break;
      case "/archive":
        $.ajax({
          url: '/api/videos/archive'
        }).done(function(data) {
          console.log(data);
        });
        break;
      case "/list-all":
        $.ajax({
          url: '/api/videos'
        }).done(function(data) {
          this.setState({
            searchResults: this.buildVideoResults(data)
          });
        }.bind(this));
        break;
      case "/clear":
        this.setState({
          searchResults: [],
          currentVideo: {},
          applyFilter: ""
        });
        document.title = appTitle;
        if(socket!==undefined) {
          socket.emit("title", { title: appTitle });
        }
        break;
      case "/gv":
      case "/grid-view":
        this.setState({
          gridView: true
        });
        break;
      case "/dv":
      case "/default-view":
        this.setState({
          gridView: false
        });
        break;
      case "/monochrome":
        this.setState({ applyFilter: "grayscale" });
        break;
      case "/saturate":
        this.setState({ applyFilter: "saturate" });
        break;
      case "/sepia":
        this.setState({ applyFilter: "sepia" });
        break;
      case "/normal":
        this.setState({ applyFilter: "normal" });
        break;
      case "/filter":
        if(commandSegments.length > 0) {
          switch(commandSegments[1]) {
            case "monochrome":
            case "grayscale":
              this.setState({ applyFilter: "grayscale" });
              break;
            case "saturate":
              this.setState({ applyFilter: "saturate" });
              break;
            case "sepia":
              this.setState({ applyFilter: "sepia" });
              break;
            case "normal":
              this.setState({ applyFilter: "normal" });
              break;
          }
        }
        break;
      case "/history":
        this.performSearch("/g Recently Played");
        break;
      case "/rp":
      case "/recently-played":
        $.post({
          url: "/api/videos/recently-played/last30"
        }).done(function(data) {
          this.setState({
            searchResults: this.buildVideoResults(data),
            manage: false
          });
        }.bind(this));
        break;
      case "/rps":
      case "/recently-played-search":
        $.post({
          url: "/api/videos/recently-played/search",
          data: { searchTerm: searchTerm.replace(command, "") }
        })
        .done(function(data) {
          this.setState({
            searchResults: this.buildVideoResults(data),
            manage: false
          });
        }.bind(this));
        break;
      case "/rptrim":
      case "/trim-recently-played":
        $.post({
          url: "/api/videos/recently-played/last30",
          data: { trim: true }
        }).done(function(data) {
          this.setState({
            searchResults: this.buildVideoResults(data),
            manage: false
          });
        }.bind(this));
        break;
      case "/manage":
        $.ajax({
          url: '/api/videos'
        }).done(function(data) {
          this.setState({
            searchResults: this.buildVideoResults(data),
            manage: true
          });
        }.bind(this));
        break;

      default:
        this.performSearch(searchTerm);
        break;
    }
  }
  componentDidMount() {
    document.title = appTitle;

    if(socket!==undefined) {
      // User clicked on a recommended video at the end of playing a video
      socket.on("play-video", function(data) {
        this.setState({
          // Once the video loads we'll get a notification from YouTube
          // about what the title is. Then everything falls into place.
          currentVideo: {
            title: "",
            ytid: data.ytid
          }
        }, function() {
          this.playVideo(data);
        });
      }.bind(this));
    }

    $.ajax({
      url: '/api/videos/groups'
    }).done(function(data) {
      //console.log(data);
      this.setState({
        groups: data
      })
    }.bind(this));
  }
  buildVideoResults(data) {
    var results = [];

    _.forEach(data, function(v) {

      // Image thumbnail URL looks like this:
      //
      // https://i.ytimg.com/vi/YTID/default.jpg
      // https://i.ytimg.com/vi/YTID/mqdefault.jpg
      // https://i.ytimg.com/vi/YTID/hqdefault.jpg

      results.push({
        //player: this.state.player,
        playVideo: this.playVideo.bind(this),
        title: v.title,
        ytid: v.ytid,
        group: v.group,
        thumbnail: `https://i.ytimg.com/vi/${v.ytid}/default.jpg`,
        isArchived: v.isArchived
      });
    }.bind(this));

    return _.sortBy(results, "title");
  }
  addVideoButtonHandler(video, group) {
    let found = _.find(this.state.searchResults, { ytid: video.ytid });

    if(found !== undefined) {
      found.isArchived = true;

      $.post({
        url: "/api/videos/add",
        data: {
          title: video.title,
          ytid: video.ytid,
          group: (group !== undefined) ? group : "misc"
        }
      });
    }
  }
  updateVideoButtonHandler(video, group) {
    // console.log(`updateVideoButtonHandler() :: Called`);
    // console.log(video);
    // console.log(group);

    let found = _.find(this.state.searchResults, { ytid: video.ytid });

    if(found !== undefined) {
      found.isArchived = true;
      found.title = video.title;

      $.post({
        url: "/api/videos/update",
        data: {
          title: video.title,
          ytid: video.ytid,
          group: (group !== undefined) ? group : "misc"
        }
      });
    }
  }
  deleteVideoButtonHandler(video) {
    // console.log(`deleteVideoButtonHandler() :: Called`);
    // console.log(video);

    let found = _.find(this.state.searchResults, { ytid: video.ytid });

    if(found !== undefined) {
      $.post({
        url: "/api/videos/delete",
        data: {
          ytid: video.ytid
        }
      });

      this.setState({
        searchResults: _.reject(this.state.searchResults, { ytid: video.ytid })
      });
    }
  }
  playVideo(video, data) {
    this.setState({
      currentVideo: video,
      searchResults: data,
      manage: false
    });

    if(video.title !== undefined && video.title.length > 0) {
      $.post({
        url: "/api/videos/recently-played/add",
        data: {
          title: video.title,
          ytid: video.ytid
        }
      });
    }
  }
  render() {
    let versionDisplay = true;
    if (this.state.searchResults !== undefined && this.state.searchResults.length > 0) {
      versionDisplay = false;
    }

    let view;

    if(this.state.gridView) {
      view = <VideoListGrid data={this.state.searchResults} applyFilter={this.state.applyFilter} />; 
    } else {
      view = 
        <VideoList data={this.state.searchResults}
            groups={this.state.groups}
            manage={this.state.manage}
            applyFilter={this.state.applyFilter}
            addVideoButtonHandler={this.addVideoButtonHandler}
            updateVideoButtonHandler={this.updateVideoButtonHandler}
            deleteVideoButtonHandler={this.deleteVideoButtonHandler} />;
    }

    return (
      <div>
        <CommandInput onKeyEnter={this.onCommandEntered} />
        {view}
        <Version display={versionDisplay} info="Toby-1.0-RC3"  />
        <YouTubeUI video={this.state.currentVideo} applyFilter={this.state.applyFilter} />
      </div>
    );
  }
}


$(document).ready(function() {
  ReactDOM.render(<TobyUI />, document.getElementById("ui"));
});
