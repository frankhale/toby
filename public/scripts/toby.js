'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Toby = (function () {

  _.mixin({
    'pluckMany': function pluckMany(data, columns) {
      return _.map(data, _.partialRight(_.pick, columns));
    },
    'findByValues': function findByValues(collection, property, values) {
      return _.filter(collection, function (item) {
        return _.contains(values, item[property]);
      });
    }
  });

  var notificationTimeout = 3000;

  var CommandInput = (function (_React$Component) {
    _inherits(CommandInput, _React$Component);

    function CommandInput() {
      _classCallCheck(this, CommandInput);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommandInput).call(this));

      _this.onCommandInputKeyUp = _this.onCommandInputKeyUp.bind(_this);
      _this.onCommandInputChanged = _this.onCommandInputChanged.bind(_this);

      _this.keys = {
        Enter: 13,
        Up: 38,
        Down: 40
      };

      _this.state = {
        commandIndex: -1,
        commandsEntered: []
      };
      return _this;
    }

    _createClass(CommandInput, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // Make sure the command input box width is a consistant width based on the
        // width of the window.
        var $commandText = $("#commandText");

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

        $(window).resize(function (e) {
          resizeCommandInput();
        });
      }
    }, {
      key: 'onCommandInputKeyUp',
      value: function onCommandInputKeyUp(e) {
        var _this2 = this;

        if (e.which === this.keys.Up) {
          (function () {
            var commandIndex = _this2.state.commandIndex === -1 ? _this2.state.commandsEntered.length - 1 : --_this2.state.commandIndex;

            if (commandIndex < 0) {
              commandIndex = 0;
            }

            _this2.setState({ commandIndex: commandIndex }, function () {
              this.state.commandText.val(this.state.commandsEntered[commandIndex]);
            });
          })();
        } else if (e.which === this.keys.Down) {
          (function () {
            var commandIndex = _this2.state.commandIndex === -1 ? 0 : ++_this2.state.commandIndex;

            if (commandIndex > _this2.state.commandsEntered.length) {
              commandIndex = _this2.state.commandsEntered.length;
            }

            _this2.setState({ commandIndex: commandIndex }, function () {
              this.state.commandText.val(this.state.commandsEntered[commandIndex]);
            });
          })();
        } else if (e.which === this.keys.Enter) {
          var _ret3 = (function () {
            var textEntered = _this2.state.commandText.val();
            if (!(textEntered.length > 0)) return {
                v: undefined
              };

            _this2.setState({
              commandsEntered: _.uniq(_this2.state.commandsEntered.concat([textEntered])),
              commandIndex: -1
            }, function () {
              if (this.props.onKeyEnter !== undefined) {
                this.props.onKeyEnter(textEntered);
              }
            });
          })();

          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        }
      }
    }, {
      key: 'onCommandInputChanged',
      value: function onCommandInputChanged(e) {
        var textEntered = this.state.commandText.val();

        if (this.props.onKeyChanged !== undefined) {
          this.props.onKeyChanged(textEntered);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { id: 'commandContainer', className: 'command-container' },
          '>',
          React.createElement('input', { id: 'commandText', className: 'command-input', type: 'text', onKeyUp: this.onCommandInputKeyUp, onChange: this.onCommandInputChanged, autoFocus: true, placeholder: 'Search YouTube or your saved videos...' })
        );
      }
    }]);

    return CommandInput;
  })(React.Component);

  var ContentPanel = (function (_React$Component2) {
    _inherits(ContentPanel, _React$Component2);

    function ContentPanel() {
      _classCallCheck(this, ContentPanel);

      var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ContentPanel).call(this));

      _this3.state = {
        data: [],
        applyFilter: ""
      };
      return _this3;
    }

    _createClass(ContentPanel, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.data !== undefined) {
          this.setState({
            data: nextProps.data,
            applyFilter: nextProps.applyFilter !== undefined ? nextProps.applyFilter : ""
          });
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var resizeHighlight = function resizeHighlight() {
          $(".highlightRow").css("width", window.innerWidth - 25);
          $(".videoTitle").css("width", window.innerWidth - 200);
        };

        window.addEventListener("resize", function (e) {
          resizeHighlight();
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        // function markdownThisShit(d) {
        //   const item = validator.escape(d);
        //   return { __html: marked(item) };
        // }

        var highlightRowStyle = {
          width: window.innerWidth - 25
        };

        var videoTitleStyle = {
          width: window.innerWidth - 200
        };

        return React.createElement(
          'div',
          { className: 'content-panel' },
          this.state.data.map(function (d, i) {
            //return <div dangerouslySetInnerHTML={markdownThisShit(d)} key={i}></div>;
            return React.createElement(
              'div',
              { className: 'highlightRow', style: highlightRowStyle, onClick: d.playVideo.bind(_this4, d) },
              React.createElement(
                'div',
                { className: "alignDiv videoThumbnail " + _this4.state.applyFilter },
                React.createElement('img', { src: d.thumbnail })
              ),
              React.createElement(
                'div',
                { className: 'alignDiv videoTitle', style: videoTitleStyle },
                d.title
              )
            );
          })
        );
      }
    }]);

    return ContentPanel;
  })(React.Component);

  var VideoAddedNotification = (function (_React$Component3) {
    _inherits(VideoAddedNotification, _React$Component3);

    function VideoAddedNotification() {
      _classCallCheck(this, VideoAddedNotification);

      var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(VideoAddedNotification).call(this));

      _this5.state = _this5.initialState();
      return _this5;
    }

    _createClass(VideoAddedNotification, [{
      key: 'initialState',
      value: function initialState() {
        return {
          message: "",
          notificationStyle: {
            display: "none"
          }
        };
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.message !== undefined && nextProps.message.length > 0) {
          this.setState({
            message: nextProps.message,
            notificationStyle: {
              display: "block"
            }
          }, (function () {
            //console.log(`message set to: ${this.state.message}`);
            setTimeout((function () {
              this.setState(this.initialState);
            }).bind(this), notificationTimeout);
          }).bind(this));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'videoAddedNotification', style: this.state.notificationStyle },
          this.state.message
        );
      }
    }]);

    return VideoAddedNotification;
  })(React.Component);

  var AppUI = (function (_React$Component4) {
    _inherits(AppUI, _React$Component4);

    function AppUI() {
      _classCallCheck(this, AppUI);

      var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(AppUI).call(this));

      _this6.onCommandEntered = _this6.onCommandEntered.bind(_this6);
      _this6.onCommandChanged = _this6.onCommandChanged.bind(_this6);

      _this6.state = {
        commands: [],
        searchResults: [],
        videoInfo: {},
        videoAddedNotification: ""
      };
      return _this6;
    }

    _createClass(AppUI, [{
      key: 'onCommandEntered',
      value: function onCommandEntered(searchTerm) {
        $.ajax({
          url: '/api/search/' + encodeURIComponent(searchTerm),
          cache: false
        }).done((function (data) {
          var commands = this.state.commands;
          commands.push(searchTerm);

          this.state.player.stopVideo();
          $("#player").css("display", "none");
          $.ajax({ type: "POST", url: '/api/resetWindowTitleToDefault' });

          this.setState({
            commands: commands,
            searchResults: this.buildResults(data)
          });
        }).bind(this));
      }
    }, {
      key: 'onCommandChanged',
      value: function onCommandChanged(command) {
        if (!(command.length > 0)) {
          this.setState({
            searchResults: []
          });

          this.state.player.stopVideo();
          $("#player").css("display", "none");
          $.ajax({ type: "POST", url: '/api/resetWindowTitleToDefault' });

          return;
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.initKeyBindings();

        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        window.onYouTubeIframeAPIReady = (function () {
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
        }).bind(this);

        var onPlayerReady = function onPlayerReady(e) {
          $(window.frames[0].document).on("keydown", function (e) {
            $(top.document).trigger(e);
          });

          player.setVolume(30);
        };

        var onPlayerStateChange = (function (e) {
          var videoInfo = e.target.getVideoData();

          if (videoInfo.title !== "" && (this.state.videoInfo.title === undefined || this.state.videoInfo.title !== videoInfo.title)) {
            this.setState({
              videoInfo: videoInfo
            }, function () {
              $.ajax({
                type: "POST",
                url: "/api/title",
                data: {
                  title: videoInfo.title
                } //,
                //success: function(data) {
                // console.log(data);
                //}
              });
            });
          }
        }).bind(this);
      }
    }, {
      key: 'initKeyBindings',
      value: function initKeyBindings() {
        $(document).on("keydown", (function (e) {
          var keycode = e.keyCode || e.which;

          if (keycode === 116) {
            if (!_.isEmpty(this.state.videoInfo)) {
              //console.log(this.state.videoInfo);

              $.ajax({
                url: "/api/add",
                type: "POST",
                data: {
                  title: this.state.videoInfo.title,
                  ytid: this.state.videoInfo.video_id,
                  group: "misc" // <- making way for user selection
                },
                success: (function (data) {
                  //console.log(data);
                  this.setState({
                    videoAddedNotification: data.status
                  }, (function () {
                    setTimeout((function () {
                      this.setState({ videoAddedNotification: "" });
                    }).bind(this), notificationTimeout);
                  }).bind(this));
                }).bind(this)
              });
            }
          } else if (keycode === 117) {
            //$(".videoThumbnail").css("-webkit-filter", "grayscale(1)");
            this.setState({
              applyFilter: "blackandwhite"
            });

            $("#player").contents().find(".html5-main-video").css("-webkit-filter", "grayscale(1)");
          } else if (keycode === 118) {
            //$(".videoThumbnail").css("-webkit-filter", "saturate(2.5)");
            this.setState({
              applyFilter: "saturate"
            });

            $("#player").contents().find(".html5-main-video").css("-webkit-filter", "saturate(2.5)");
          } else if (keycode === 119) {
            //$(".videoThumbnail").css("-webkit-filter", "sepia(1)");
            this.setState({
              applyFilter: "sepia"
            });

            $("#player").contents().find(".html5-main-video").css("-webkit-filter", "sepia(1)");
          } else if (keycode === 120) {
            //$(".videoThumbnail").css("-webkit-filter", "");

            this.setState({
              applyFilter: ""
            });

            $("#player").contents().find(".html5-main-video").css("-webkit-filter", "");
          }
        }).bind(this));
      }
    }, {
      key: 'buildResults',
      value: function buildResults(data) {
        var results = [];

        _.forEach(data, (function (v) {

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
            thumbnail: 'https://i.ytimg.com/vi/' + v.ytid + '/default.jpg'
          });
        }).bind(this));

        return results;
      }
    }, {
      key: 'playVideo',
      value: function playVideo(video) {
        this.state.player.loadVideoById(video.ytid);
        //this.state.player.setVolume(30);

        $("#player").css("display", "block");

        //document.getElementById("player").scrollIntoView(true);
        $('html, body').animate({ scrollTop: $("#player").offset().top }, 250);

        $.ajax({
          type: "POST",
          url: "/api/title",
          data: { title: video.title }
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
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          null,
          React.createElement(VideoAddedNotification, { message: this.state.videoAddedNotification }),
          React.createElement(CommandInput, { onKeyEnter: this.onCommandEntered, onKeyChanged: this.onCommandChanged }),
          React.createElement(ContentPanel, { data: this.state.searchResults, applyFilter: this.state.applyFilter }),
          React.createElement('div', { id: 'player' })
        );
      }
    }]);

    return AppUI;
  })(React.Component);

  return {
    init: function init() {
      ReactDOM.render(React.createElement(AppUI, null), document.getElementById("ui"));
    }
  };
})();

$(document).ready(function () {
  Toby.init();
});
//# sourceMappingURL=toby.js.map
