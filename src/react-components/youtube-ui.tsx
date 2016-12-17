// youtube-ui.tsx - YouTube player React component for Toby
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

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import * as $ from "jquery";

import { IVideoEntry } from "./infrastructure";

interface Window {
    onYouTubeIframeAPIReady(): void;
}
declare var window: Window;

interface IYouTubeState {
  player?: any,
  applyFilter?: string
  currentVideo?: IVideoEntry
}

export interface IYouTubeProps {
  socket: SocketIOClient.Socket;
  video: IVideoEntry;
  applyFilter: string;
}

export class YouTube extends React.Component<IYouTubeProps, IYouTubeState> {
  constructor() {
    super();

    this.state = {
      currentVideo: ({} as IVideoEntry)
    }
  }
  componentDidMount() : void {
    $.getScript("https://www.youtube.com/iframe_api", (data, textStatus, jqxhr) => {
      if(textStatus === "success") {
        console.log("YouTube API loaded...");
        this.setupYTPlayer();
      }
    });
  }
  componentWillReceiveProps(nextProps : any) : void {
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

    if(nextProps.video !== undefined && 
      (!(_.isEmpty(nextProps.video))) &&
       nextProps.video.ytid !== undefined &&
       nextProps.video.ytid !== "") {

      if(this.state.currentVideo !== undefined &&
         this.state.currentVideo.ytid === nextProps.video.ytid) return;

      this.setState({ currentVideo: nextProps.video });
      this.playVideo(nextProps.video);
    } else if(!(_.isEmpty(this.state.currentVideo))) {
      this.state.player.stopVideo();
      $("#player").css("display", "none");

      this.setState({ currentVideo: { title: "", ytid: "" } });
    }
  }
  private setupYTPlayer() : void {
    let player : YT.Player = undefined;

    const onPlayerReady = (e : any) => {
      player.setVolume(30);
    };

    const onPlayerStateChange = (e: any) => {
      const videoInfo = e.target.getVideoData();

      if(videoInfo.title !== "" &&
        this.state.currentVideo.title === "" ||
        this.state.currentVideo.title !== videoInfo.title) {

        document.title = videoInfo.title;

        if(this.props.socket !== undefined) {
          this.props.socket.emit("title", { title: videoInfo.title });
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
    };

    window.onYouTubeIframeAPIReady = () => {
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

      let $player = $("#player");

      if(navigator.userAgent.includes("node-webkit")) {
        $player.attr("nwdisable", "");
      }

      if(navigator.userAgent.includes("node-webkit") || navigator.userAgent.includes("Electron")) {
        setInterval(() => {
          $player.contents().find(".adDisplay").css("display", "none");
        }, 1000);
      }

      this.setState({ player: player });
    };
  }
  private playVideo(video : IVideoEntry) : void {
    this.state.player.setVolume(30);
    this.state.player.loadVideoById(video.ytid);

    const $player = $("#player"),
          $ui = $("#ui");

    if($player.css("display") !== "block") {
      $player.css("display", "block");
    }

    $ui.animate({ scrollTop: $ui.prop("scrollHeight")}, 250);
  }
  render() {
    return (
      <div id="player"></div>
    );
  }
}