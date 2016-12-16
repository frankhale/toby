// toby-ui.tsx - Front end code React component for Toby
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
import * as io from "socket.io-client";
import * as $ from "jquery";

import { CommandInput } from "./command-input-ui";
import { IYouTubeProps, YouTube } from "./youtube-ui";
import { IVersionProps, Version } from "./version-ui";
import { IViewListGridProps, VideoListGrid } from "./video-list-grid-ui";
import { IVideoGroup, 
         IVideoEntry, 
         ITobyVersionInfo, 
         ISearchResults } from "./infrastructure";

interface ITobyState {
  videoData?: IVideoGroup[],
  searchResults?: ISearchResults[],
  applyFilter?: string,
  currentVideo?: IVideoEntry,
  groups?: string[],
  gridView?: boolean,
  manage?: boolean,
  tobyVersionInfo?: ITobyVersionInfo
}

export class Toby extends React.Component<{}, ITobyState> {
  private socket: SocketIOClient.Socket;
  
  constructor() {
    super();

    this.onCommandEntered = this.onCommandEntered.bind(this);
    this.onAddVideoButtonClick = this.onAddVideoButtonClick.bind(this);
    this.onUpdateVideoButtonClick = this.onUpdateVideoButtonClick.bind(this);
    this.onDeleteVideoButtonClick = this.onDeleteVideoButtonClick.bind(this);

    this.state = {
      videoData: [],
      searchResults: [],
      applyFilter: "",      
      gridView: true,
      manage: false,
      tobyVersionInfo: { title: "", version: ""}
    }

    this.socket = (navigator.userAgent.includes("node-webkit") || navigator.userAgent.includes("Electron")) ? io("http://localhost:62375") : undefined;
  }
  componentDidMount() {
    if(this.socket !== undefined) {
      this.socket.on("toby-version", (data: ITobyVersionInfo) : void => {
        this.setState({
          tobyVersionInfo: { 
            title: data.title,
            version: data.version
          }
        });
      });
      
      // User clicked on a recommended video at the end of playing a video
      this.socket.on("play-video", (ytid : string) => {
        this.playVideo({ title: "", ytid: ytid});
      });
    }

    $.ajax({
      url: '/api/videos/groups'
    }).done((data) => {      
      this.setState({
        groups: data
      });
    });
  }
  performSearch(searchTerm: string) : void {
    $.post({
      url: "/api/videos/search",
      data: { searchTerm: searchTerm }
    })
    .done((data : IVideoEntry[]) : void => {
      this.setState({
        searchResults: this.buildVideoResults(data),
        manage: false
      });
    });    
  }
  buildVideoResults(data: IVideoEntry[]) : ISearchResults[] {    
    let results : ISearchResults[] = [];

    _.forEach(data, (v) => {
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
    });

    return _.sortBy(results, "title");
  }
  onCommandEntered(searchTerm: string) : void {
    const commandSegments = searchTerm.split(" ");
    const command = commandSegments[0];

    switch(command) {
      // case "/videos":
      //   $.ajax({
      //     url: '/api/videos'
      //   }).done((data) => {
      //     console.log(data);
      //   });
      //   break;
      // case "/groups":
      //   $.ajax({
      //     url: '/api/videos/groups'
      //   }).done((data) => {
      //     console.log(data);
      //   });
      //   break;
      case "/archive":
        $.ajax({
          url: '/api/videos/archive'
        }).done((data) => {
          console.log(data);
        });
        break;
      case "/list-all":
        $.ajax({
          url: '/api/videos'
        }).done((data) => {
          this.setState({
            searchResults: this.buildVideoResults(data)
          });
        });
        break;
      case "/clear":
        this.setState({
          searchResults: [],
          currentVideo: { title: "", ytid: "" },
          applyFilter: ""
        });
        
        document.title = this.state.tobyVersionInfo.title;
        
        if(this.socket !== undefined) {
          this.socket.emit("title", { title: this.state.tobyVersionInfo.title });
        }
        break;
      case "/gv":
      case "/grid-view":
        this.setState({ gridView: true });
        break;
      case "/dv":
      case "/default-view":
        this.setState({ gridView: false });
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
        }).done((data) => {
          this.setState({
            searchResults: this.buildVideoResults(data),
            manage: false
          });
        });
        break;
      case "/rps":
      case "/recently-played-search":
        $.post({
          url: "/api/videos/recently-played/search",
          data: { searchTerm: searchTerm.replace(command, "") }
        })
        .done((data) => {
          this.setState({
            searchResults: this.buildVideoResults(data),
            manage: false
          });
        });
        break;
      case "/rptrim":
      case "/trim-recently-played":
        $.post({
          url: "/api/videos/recently-played/last30",
          data: { trim: true }
        }).done((data) => {
          this.setState({
            searchResults: this.buildVideoResults(data),
            manage: false
          });
        });
        break;
      case "/manage":
        $.ajax({
          url: '/api/videos'
        }).done((data) => {
          this.setState({
            searchResults: this.buildVideoResults(data),
            manage: true
          });
        });
        break;

      default:
        this.performSearch(searchTerm);
        break;
    }
  }
<<<<<<< HEAD:src/toby-ui.js
  componentDidMount() {
    document.title = appTitle;

    if(socket!==undefined) {
      socket.on("toby-version", (data) => {
        this.setState({
          tobyVersion: data
        });
      });
      
      // User clicked on a recommended video at the end of playing a video
      socket.on("play-video", (data) => {
        this.setState({
          // Once the video loads we'll get a notification from YouTube
          // about what the title is. Then everything falls into place.
          currentVideo: {
            title: "",
            ytid: data.ytid
          }
        }, () => { this.playVideo(data); });
      });
    }

    $.ajax({
      url: '/api/videos/groups'
    }).done((data) => {      
      this.setState({
        groups: data
      });
    });
  }
  buildVideoResults(data) {
    var results = [];

    _.forEach(data, (v) => {
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
    });

    return _.sortBy(results, "title");
  }
  addVideoButtonHandler(video, group) {
=======
  onAddVideoButtonClick(video: IVideoEntry, group: string) : void {
>>>>>>> refs/remotes/origin/typescript-rewrite:src/react-components/toby-ui.tsx
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
  onUpdateVideoButtonClick(video: IVideoEntry, group: string) : void {
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
  onDeleteVideoButtonClick(video: IVideoEntry) : void {
    const found = _.find(this.state.searchResults, { ytid: video.ytid });

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
  playVideo(video: IVideoEntry) : void {
    this.setState({
      currentVideo: video,
      //searchResults: data,
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
    let versionDisplay = true,
        view;
        
    if (this.state.searchResults !== undefined && this.state.searchResults.length > 0) {
      versionDisplay = false;
    }

    if(this.state.gridView) {
      view = <VideoListGrid data={this.state.searchResults} applyFilter={this.state.applyFilter} />; 
    } //else {
      // view = 
      //   <VideoList data={this.state.searchResults}
      //       groups={this.state.groups}
      //       manage={this.state.manage}
      //       applyFilter={this.state.applyFilter}
      //       addVideoButtonHandler={this.addVideoButtonHandler}
      //       updateVideoButtonHandler={this.updateVideoButtonHandler}
      //       deleteVideoButtonHandler={this.deleteVideoButtonHandler} />;
    //}

    return (
      <div>
        <CommandInput onKeyEnter={this.onCommandEntered}
                      placeHolder="Search YouTube or your saved videos..." />
        {view}
        <YouTube video={this.state.currentVideo} 
                 applyFilter={this.state.applyFilter} 
                 socket={this.socket} />
        <Version display={versionDisplay} info={this.state.tobyVersionInfo.version}  />
      </div>
    );
  }
}

$(document).ready(() => {
  ReactDOM.render(<Toby />, document.getElementById("ui"));
});