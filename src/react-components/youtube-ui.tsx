// youtube-ui.tsx - YouTube player React component for Toby
// Author(s): Frank Hale <frankhale@gmail.com>
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

import * as React from "react";
import * as $ from "jquery";

import { IVideoEntry } from "./infrastructure";

interface Window {
  onYouTubeIframeAPIReady(): void;
  snapToPlayer(): void;
  addKeyHandlers(): void;
}
declare var window: Window;

interface IYouTubeState {
  player?: any;
  applyFilter?: string;
  currentVideo?: IVideoEntry;
}

export interface IYouTubeProps {
  socket: SocketIOClient.Socket;
  video: IVideoEntry;
  applyFilter: string;
}

if (
  navigator.userAgent.indexOf("node-webkit") > -1 ||
  navigator.userAgent.indexOf("Electron") > -1
) {
  // This is here because when exiting fullscreen in NW.js the page scrolls to
  // top instead of centering on the YouTube player. This is called by an
  // injected script into the webview that Toby lives inside of when running in
  // NW.js.
  window.snapToPlayer = () => {
    let $ui = $("#ui");
    $("#ui").prop("scrollTop", $ui.prop("scrollHeight"));
  };
}

export class YouTube extends React.Component<IYouTubeProps, IYouTubeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentVideo: {} as IVideoEntry
    };
  }
  componentDidMount(): void {
    $.getScript("https://www.youtube.com/iframe_api", (_data, textStatus, _jqxhr) => {
      if (textStatus === "success") {
        console.log("YouTube API loaded...");
        this.setupYTPlayer();
      }
    });
  }

  static getDerivedStateFromProps(props: IYouTubeProps, state: IYouTubeState): IYouTubeState {
    if (
      navigator.userAgent.indexOf("node-webkit") > -1 ||
      navigator.userAgent.indexOf("Electron") > -1
    ) {
      if (
        props.applyFilter !== undefined &&
        props.applyFilter.length > 0 &&
        state.applyFilter !== props.applyFilter
      ) {
        let $player = $("#player")
          .contents()
          .find(".html5-main-video");

        switch (props.applyFilter) {
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

        return {
          applyFilter: props.applyFilter
        };
      }
    }

    return null;
  }

  getSnapshotBeforeUpdate(prevProps: IYouTubeProps, prevState: IYouTubeState) {
    if (this.props.video === undefined) return null;

    if (prevState.currentVideo.ytid !== this.props.video.ytid) {
      return {
        video: this.props.video
      };
    }

    return null;
  }

  componentDidUpdate(prevProps: IYouTubeProps, prevState: IYouTubeState, snapshot: any) {
    if (snapshot !== null) {
      this.setState(
        {
          currentVideo: snapshot.video
        },
        () => {
          if (this.state.currentVideo.title === "" && this.state.currentVideo.ytid === "") {
            this.state.player.stopVideo();
            $("#player").css("display", "none");
          } else {
            this.playVideo(this.state.currentVideo);
          }
        }
      );
    }
  }

  private setupYTPlayer(): void {
    let player: YT.Player = undefined;

    const onPlayerReady = (e: any) => {
      player.setVolume(30);
    };

    const onPlayerStateChange = (e: any) => {
      const videoInfo = e.target.getVideoData();

      if (
        (videoInfo.title !== "" && this.state.currentVideo.title === "") ||
        this.state.currentVideo.title !== videoInfo.title
      ) {
        document.title = videoInfo.title;

        if (this.props.socket !== undefined) {
          this.props.socket.emit("title", videoInfo.title);
        }

        this.setState({
          currentVideo: {
            title: videoInfo.title,
            ytid: videoInfo.video_id
          }
        });

        $.post({
          url: "/api/videos/recently-played/add",
          data: {
            title: videoInfo.title,
            ytid: videoInfo.video_id
          }
        });
      }
    };

    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player("player", {
        videoId: "",
        playerVars: {
          autoplay: 1,
          iv_load_policy: 3
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });

      let $player = $("#player");

      if (navigator.userAgent.indexOf("node-webkit") > -1) {
        $player.attr("nwdisable", "");
      }

      if (
        navigator.userAgent.indexOf("node-webkit") > -1 ||
        navigator.userAgent.indexOf("Electron") > -1
      ) {
        setInterval(() => {
          $player
            .contents()
            .find(".adDisplay")
            .css("display", "none");
        }, 1000);
      }

      this.setState({ player: player });
    };
  }
  private playVideo(video: IVideoEntry): void {
    if (!this.state.player) return;

    this.state.player.setVolume(30);
    this.state.player.loadVideoById(video.ytid);

    const $player = $("#player"),
      $ui = $("#ui");

    if ($player.css("display") !== "block") {
      $player.css("display", "block");
    }

    $ui.animate({ scrollTop: $ui.prop("scrollHeight") }, 250);
  }
  render() {
    return <div id="player" />;
  }
}
