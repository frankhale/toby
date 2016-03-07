// toby.es6 - Front end code for Toby
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

const Toby = (function() {

  _.mixin({
    'pluckMany': (data,columns) => {
      return _.map(data,_.partialRight(_.pick,columns));
    },
    'findByValues': (collection, property, values) => {
      return _.filter(collection, function(item) {
        return _.contains(values, item[property]);
      });
    }
  });

  let notificationTimeout = 3000;

  class CommandInput extends React.Component {
    constructor() {
      super();
      this.onCommandInputKeyUp = this.onCommandInputKeyUp.bind(this);
      this.onCommandInputChanged = this.onCommandInputChanged.bind(this);

      this.keys = {
        Enter: 13,
        Up: 38,
        Down: 40
      };

      this.state = {
        commandIndex: -1,
        commandsEntered: []
      };
    }
    componentDidMount() {
      // Make sure the command input box width is a consistant width based on the
      // width of the window.
      const $commandText = $("#commandText");

      // this may need to be changed later if I have more rich UI's but basically
      // this will make sure the command input is always focused, hopefully.
      // $(commandText).on("blur", () => {
      //   $commandText.focus();
      // });

      this.setState({ commandText: $commandText });

      function resizeCommandInput() {
        $commandText.width(window.innerWidth - 50);
      }

      resizeCommandInput();

      $(window).resize((e) => {
        resizeCommandInput();
      });
    }
    onCommandInputKeyUp(e) {
      if(e.which === this.keys.Up) {
        let commandIndex = (this.state.commandIndex === -1) ?
                            this.state.commandsEntered.length - 1 :
                            --this.state.commandIndex;

        if(commandIndex < 0) {
          commandIndex = 0;
        }

        this.setState({ commandIndex: commandIndex}, function() {
          this.state.commandText.val(this.state.commandsEntered[commandIndex]);
        });

      } else if (e.which === this.keys.Down) {
        let commandIndex = (this.state.commandIndex === -1) ? 0 : ++this.state.commandIndex;

        if(commandIndex > this.state.commandsEntered.length) {
          commandIndex = this.state.commandsEntered.length;
        }

        this.setState({ commandIndex: commandIndex }, function() {
          this.state.commandText.val(this.state.commandsEntered[commandIndex]);
        });

      } else if(e.which === this.keys.Enter) {
        const textEntered = this.state.commandText.val();
        if(!(textEntered.length > 0)) return;

        this.setState({
          commandsEntered: _.uniq(this.state.commandsEntered.concat([textEntered])),
          commandIndex: -1
        }, function() {
          if(this.props.onKeyEnter !== undefined) {
            this.props.onKeyEnter(textEntered);
          }
        });
      }
    }
    onCommandInputChanged(e) {
      const textEntered = this.state.commandText.val();

      if(this.props.onKeyChanged !== undefined) {
        this.props.onKeyChanged(textEntered);
      }
    }
    render() {
      return (
        <div id="commandContainer" className="command-container">
          &gt;<input id="commandText" className="command-input" type="text" onKeyUp={this.onCommandInputKeyUp} onChange={this.onCommandInputChanged} autoFocus placeholder="Search YouTube or your saved videos..." />
        </div>
      );
    }
  }

  class ContentPanel extends React.Component {
    constructor() {
      super();

      this.state = {
        data: [],
        applyFilter: ""
      };
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.data !== undefined) {
        this.setState({
          data: nextProps.data,
          applyFilter: (nextProps.applyFilter !== undefined) ? nextProps.applyFilter : ""
        });
      }
    }
    componentDidMount() {
      var resizeHighlight = function() {
        $(".highlightRow").css("width", window.innerWidth - 25);
        $(".videoTitle").css("width", window.innerWidth - 200);
      };

      window.addEventListener("resize", function(e) {
        resizeHighlight();
      });
    }
    render() {
      // function markdownThisShit(d) {
      //   const item = validator.escape(d);
      //   return { __html: marked(item) };
      // }

      let highlightRowStyle = {
        width: window.innerWidth - 25
      };

      let videoTitleStyle = {
        width: window.innerWidth - 200
      };

      return (
        <div className="content-panel">
        {
          this.state.data.map((d, i) => {
            //return <div dangerouslySetInnerHTML={markdownThisShit(d)} key={i}></div>;
            return (
              <div className="highlightRow" style={highlightRowStyle} onClick={d.playVideo.bind(this, d)}>
                <div className={"alignDiv videoThumbnail " + this.state.applyFilter}><img src={d.thumbnail}></img></div>
                <div className="alignDiv videoTitle" style={videoTitleStyle}>{d.title}</div>
              </div>
            );
          })
        }
        </div>
      )
    }
  }

  class VideoAddedNotification extends React.Component {
    constructor() {
      super();

      this.state = this.initialState();
    }
    initialState() {
      return {
        message: "",
        notificationStyle: {
          display: "none"
        }
      };
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.message !== undefined && nextProps.message.length > 0) {
        this.setState({
          message: nextProps.message,
          notificationStyle: {
            display: "block"
          }
        }, function() {
          //console.log(`message set to: ${this.state.message}`);
          setTimeout(function() {
            this.setState(this.initialState);
          }.bind(this), notificationTimeout);
        }.bind(this));
      }
    }
    render() {
      return (
        <div className="videoAddedNotification" style={this.state.notificationStyle}>{this.state.message}</div>
      );
    }
  }

  class AppUI extends React.Component {
    constructor() {
      super();

      this.onCommandEntered = this.onCommandEntered.bind(this);
      this.onCommandChanged = this.onCommandChanged.bind(this);

      this.state = {
        commands: [],
        searchResults: [],
        videoInfo: {},
        videoAddedNotification: ""
      };
    }
    onCommandEntered(searchTerm) {
      $.ajax({
        url: `/api/search/${encodeURIComponent(searchTerm)}`,
        cache: false
      })
      .done(function(data) {
        let commands = this.state.commands;
        commands.push(searchTerm);

        this.state.player.stopVideo();
        $("#player").css("display", "none");
        $.ajax({ type: "POST", url: `/api/resetWindowTitleToDefault` });

        this.setState({
          commands: commands,
          searchResults: this.buildResults(data)
        });
      }.bind(this));
    }
    onCommandChanged(command) {
      if(!(command.length > 0)) {
        this.setState({
          searchResults: []
        });

        this.state.player.stopVideo();
        $("#player").css("display", "none");
        $.ajax({ type: "POST", url: `/api/resetWindowTitleToDefault` });

        return;
      }
    }
    componentDidMount() {
      this.initKeyBindings();

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
      window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
          //videoId: '',
          playerVars: { 'autoplay': 1, 'autohide': 1 },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });

        $(window.frames[0].document).on('keydown', function (e) {
            $(top.document).trigger('keydown', e);
        });

        this.setState({
          player: player
        });

      }.bind(this);

      var onPlayerReady = function(e) {
        $(window.frames[0].document).on("keydown", function (e) {
          $(top.document).trigger(e);
        });

        player.setVolume(30);
      };

      var onPlayerStateChange = function(e) {
        let videoInfo = e.target.getVideoData();

        if(videoInfo.title !== "" &&
           (this.state.videoInfo.title === undefined ||
           this.state.videoInfo.title !== videoInfo.title)) {
          this.setState({
            videoInfo: videoInfo
          }, function() {
            $.ajax({
              type: "POST",
              url: "/api/title",
              data: {
                title: videoInfo.title
              }//,
              //success: function(data) {
              // console.log(data);
              //}
            });
          });
        }
      }.bind(this);
    }
    initKeyBindings() {
      $(document).on("keydown", function(e) {
        var keycode = e.keyCode || e.which;

        if(keycode === 116) {
          if(!(_.isEmpty(this.state.videoInfo))) {
            //console.log(this.state.videoInfo);

            $.ajax({
              url: "/api/add",
              type: "POST",
              data: {
                title: this.state.videoInfo.title,
                ytid: this.state.videoInfo.video_id,
                group: "misc" // <- making way for user selection
              },
              success: function(data) {
                //console.log(data);
                this.setState({
                  videoAddedNotification: data.status
                }, function() {
                  setTimeout(function() {
                    this.setState({ videoAddedNotification: "" });
                  }.bind(this), notificationTimeout);
                }.bind(this));
              }.bind(this)
            });
          }
        } else if(keycode === 117) {
          this.setState({
            applyFilter: "blackandwhite"
          });

          $("#player").contents().find(".html5-main-video").css("-webkit-filter", "grayscale(1)");
        } else if(keycode === 118) {
          this.setState({
            applyFilter: "saturate"
          });

          $("#player").contents().find(".html5-main-video").css("-webkit-filter", "saturate(2.5)");
        } else if(keycode === 119) {
          this.setState({
            applyFilter: "sepia"
          });

          $("#player").contents().find(".html5-main-video").css("-webkit-filter", "sepia(1)");
        } else if(keycode === 120) {
          this.setState({
            applyFilter: ""
          });

          $("#player").contents().find(".html5-main-video").css("-webkit-filter", "");
        }
      }.bind(this));
    }
    buildResults(data) {
      var results = [];

      _.forEach(data, function(v) {

        // Image thumbnail URL looks like this:
        //
        // https://i.ytimg.com/vi/YTID/default.jpg
        // https://i.ytimg.com/vi/YTID/mqdefault.jpg
        // https://i.ytimg.com/vi/YTID/hqdefault.jpg

        results.push({
          player: this.state.player,
          playVideo: this.playVideo.bind(this),
          title: v.title,
          ytid: v.ytid,
          thumbnail: `https://i.ytimg.com/vi/${v.ytid}/default.jpg`
        });
      }.bind(this));

      return results;
    }
    playVideo(video) {
      this.state.player.loadVideoById(video.ytid);
      //this.state.player.setVolume(30);

      $("#player").css("display", "block");

      //document.getElementById("player").scrollIntoView(true);
      $('html, body').animate({ scrollTop: $("#player").offset().top }, 250);

      $.ajax({
        type: "POST",
        url: "/api/title",
        data: { title: video.title}
      });

      $.ajax({
        url: "/api/add",
        type: "POST",
        data: {
          title: video.title,
          ytid: video.ytid,
          group: "Recently Played" // recently played group
        }
      });
    }
    render() {
      return (
        <div>
          <VideoAddedNotification message={this.state.videoAddedNotification} />
          <CommandInput onKeyEnter={this.onCommandEntered} onKeyChanged={this.onCommandChanged} />
          <ContentPanel data={this.state.searchResults} applyFilter={this.state.applyFilter} />
          <div id="player"></div>
        </div>
      );
    }
  }

  return {
    init: function() {
      ReactDOM.render(<AppUI />, document.getElementById("ui"));
    }
  }
})();

$(document).ready(function() {
  Toby.init();
});
