if(navigator.userAgent.includes("node-webkit")) {
  // This is here because when exiting fullscreen in NW.js the page scrolls to
  // top instead of centering on the YouTube player. This is called by an
  // injected script into the webview that Toby lives inside of when running in
  // NW.js.
  function snapToPlayer() {
    let $ui = $("#ui");
    $ui.prop("scrollTop", $ui.prop("scrollHeight"));
  }
}

class YouTubeUI extends React.Component {
  constructor() {
    super();

    this.state = {
      player: null,
      applyFilter: ""
    };
  }
  setupYTPlayer() {
    const onPlayerReady = function(e) {
      // $(window.frames[0].document).on("keydown", function (e) {
      //   $(top.document).trigger(e);
      // });

      player.setVolume(30);
    };

    const onPlayerStateChange = function(e) {
      let videoInfo = e.target.getVideoData();

      if(videoInfo.title !== "" &&
        this.state.currentVideo.title === "" ||
        this.state.currentVideo.title !== videoInfo.title) {

        document.title = videoInfo.title;

        if(socket!==undefined) {
          socket.emit("title", { title: videoInfo.title });
        }

        this.setState({
          currentVideo: {
            title: videoInfo.title,
            ytid: videoInfo.video_id
          }
        });

        $.post({
          url: '/api/videos/recently-played/add',
          data: {
            title: videoInfo.title,
            ytid: videoInfo.video_id
          }
        });
      }
    }.bind(this);

    let player;
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player('player', {
        //videoId: 'FnERt5fGoOg',
        playerVars: {
          'autoplay': 0,
          'autohide': 1,
          'iv_load_policy': 3 },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });

      // $(window.frames[0].document).on('keydown', function (e) {
      //     $(top.document).trigger('keydown', e);
      // });

      let $player = $("#player");

      if(navigator.userAgent.includes("node-webkit")) {
        $player.attr("nwdisable", "");

        setInterval(function() {
          $player.contents().find(".adDisplay").css("display", "none");
        }, 1000);
      }

      this.setState({
        player: player
      });

    }.bind(this);
  }
  playVideo(video) {
    this.state.player.setVolume(30);
    this.state.player.loadVideoById(video.ytid);

    let $player = $("#player"),
        $ui = $("#ui");

    if($player.css("display") !== "block") {
      $player.css("display", "block");
    }

    $ui.animate({ scrollTop: $ui.prop("scrollHeight")}, 250);
  }
  componentDidMount() {
    $.getScript("//www.youtube.com/iframe_api", function(data, textStatus, jqxhr) {
      if(textStatus === "success") {
        console.log("YouTube API loaded...");
        this.setupYTPlayer();
      }
    }.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if(navigator.userAgent.includes("node-webkit") || navigator.userAgent.includes("Electron")) {
      if(nextProps.applyFilter !== undefined  &&
         nextProps.applyFilter.length > 0 &&
         this.state.applyFilter !== nextProps.applyFilter) {

        let $player = $("#player").contents().find(".html5-main-video");

        switch(nextProps.applyFilter) {
          case "grayscale":
            $player.css("-webkit-filter", "grayscale(1)");
            break;
          case "saturate":
            $player.css("-webkit-filter", "saturate(2.5)");
            break;
          case "sepia":
            $player.css("-webkit-filter", "sepia(1)");
            break;
          case "normal":
            $player.css("-webkit-filter", "");
            break;
        }

        this.setState({
          applyFilter: nextProps.applyFilter
        });

        return;
      }
    }

    if(nextProps.video !== undefined && (!(_.isEmpty(nextProps.video))) &&
       nextProps.video.ytid !== undefined) {

      if(this.state.currentVideo !== undefined &&
         this.state.currentVideo.ytid === nextProps.video.ytid) return;

      this.setState({ currentVideo: nextProps.video });
      this.playVideo(nextProps.video);
    } else {
      if(!(_.isEmpty(this.state.currentVideo))) {
        this.state.player.stopVideo();
        $("#player").css("display", "none");

        this.setState({ currentVideo: {} });
      }
    }
  }
  render() {
    return (
      <div id="player"></div>
    );
  }
}
