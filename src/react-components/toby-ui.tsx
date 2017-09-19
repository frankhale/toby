// toby-ui.tsx - Front end code React component for Toby
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
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import * as io from "socket.io-client";
import * as $ from "jquery";

import { CommandInput } from "./command-input-ui";
import { IYouTubeProps, YouTube } from "./youtube-ui";
import { IVersionProps, Version } from "./version-ui";
import { IViewListGridProps, VideoListGrid } from "./video-list-grid-ui";
import { VideoList } from "./video-list-ui";
import {
  IVideoGroup,
  IVideoEntry,
  ITobyVersionInfo,
  ISearchResults
} from "./infrastructure";

interface ITobyState {
  videoData?: IVideoGroup[];
  searchResults?: ISearchResults[];
  applyFilter?: string;
  currentVideo?: IVideoEntry;
  groups?: string[];
  gridView?: boolean;
  manage?: boolean;
  tobyVersionInfo?: ITobyVersionInfo;
}

interface ICommand {
  commands: string[];
  description: string;
  action: (searchTerm: string, commandSegments: string[]) => void;
}

export class Toby extends React.Component<{}, ITobyState> {
  private socket: SocketIOClient.Socket;
  private commands: ICommand[];

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
      gridView: false,
      manage: false,
      tobyVersionInfo: { title: "", version: "" }
    };

    // this.socket = (navigator.userAgent.includes("node-webkit") || navigator.userAgent.includes("Electron")) ? io("http://localhost:62375") : undefined;
    this.socket = io("http://localhost:62375");

    this.setupCommands();
  }
  componentDidMount() {
    if (this.socket !== undefined) {
      this.socket.on("toby-version", (versionInfo: ITobyVersionInfo): void => {
        this.setState({
          tobyVersionInfo: {
            title: versionInfo.title,
            version: versionInfo.version
          }
        });

        document.title = versionInfo.title;
      });

      // User clicked on a recommended video at the end of playing a video
      this.socket.on("play-video", (ytid: string) => {
        this.playVideo({ title: "", ytid: ytid });
      });
    }

    $.ajax({
      url: "/api/videos/groups"
    }).done(data => {
      this.setState({
        groups: data
      });
    });
  }
  private performSearch(searchTerm: string, url: string): void {
    // "/api/videos/search"
    // "/api/videos/youtube/search"

    $.post({
      url: url,
      data: { searchTerm: searchTerm }
    }).done((data: IVideoEntry[]): void => {
      this.setState({
        searchResults: this.buildVideoResults(data),
        manage: false
      });
    });
  }
  private buildVideoResults(data: IVideoEntry[]): ISearchResults[] {
    let results: ISearchResults[] = [];

    _.forEach(data, v => {
      // Image thumbnail URL looks like this:
      //
      // https://i.ytimg.com/vi/YTID/default.jpg
      // https://i.ytimg.com/vi/YTID/mqdefault.jpg
      // https://i.ytimg.com/vi/YTID/hqdefault.jpg

      results.push({
        // player: this.state.player,
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
  private setupCommands(): void {
    this.commands = [
      {
        commands: ["/g", "/group"],
        description: "List all local videos in group.",
        action: (searchTerm, commandSegments) => {
          this.performSearch(searchTerm, "/api/videos/search");
        }
      },
      {
        commands: ["/ls", "/loc", "/local"],
        description: "Search local videos saved in the database.",
        action: (searchTerm, commandSegments) => {
          searchTerm = _.slice(commandSegments, 1).join(" ");
          this.performSearch(searchTerm, "/api/videos/search");
        }
      },
      {
        commands: ["/archive"],
        description: "Archive the database into a JSON file.",
        action: (searchTerm, commandSegments) => {
          $.get({
            url: "/api/videos/archive"
          });
        }
      },
      {
        commands: ["/list", "/list-all"],
        description: "List all the videos in the database.",
        action: (searchTerm, commandSegments) => {
          $.get({
            url: "/api/videos"
          }).done(data => {
            this.setState({
              searchResults: this.buildVideoResults(data)
            });
          });
        }
      },
      {
        commands: ["/cls", "/clear"],
        description: "Clear the current search results.",
        action: (searchTerm, commandSegments) => {
          this.setState({
            searchResults: [],
            currentVideo: { title: "", ytid: "" },
            applyFilter: ""
          });

          document.title = this.state.tobyVersionInfo.title;

          if (this.socket !== undefined) {
            this.socket.emit("title", this.state.tobyVersionInfo.title);
          }
        }
      },
      {
        commands: ["/gv", "/grid-view"],
        description: "Switch to the grid view for listing videos.",
        action: (searchTerm, commandSegments) => {
          this.setState({ gridView: true });
        }
      },
      {
        commands: ["/dv", "/default-view"],
        description: "Switch to the default view for listing videos.",
        action: (searchTerm, commandSegments) => {
          this.setState({ gridView: false });
        }
      },
      {
        commands: ["/mc", "/monochrome"],
        description: "Switch the thumbnails and video to a monochome filter.",
        action: (searchTerm, commandSegments) => {
          this.setState({ applyFilter: "grayscale" });
        }
      },
      {
        commands: ["/sat", "/saturate"],
        description: "Switch the thumbnails and video to a saturated filter.",
        action: (searchTerm, commandSegments) => {
          this.setState({ applyFilter: "saturate" });
        }
      },
      {
        commands: ["/sep", "/sepia"],
        description: "Switch the thumbnails and video to a sepia filter.",
        action: (searchTerm, commandSegments) => {
          this.setState({ applyFilter: "sepia" });
        }
      },
      {
        commands: ["/norm", "/normal"],
        description:
          "Remove user set filters and return thumbnails and video to a normal filter.",
        action: (searchTerm, commandSegments) => {
          this.setState({ applyFilter: "normal" });
        }
      },
      {
        commands: ["/history"],
        description: "List all recently played videos.",
        action: (searchTerm, commandSegments) => {
          this.performSearch("/g Recently Played", "/api/videos/search");
        }
      },
      {
        commands: ["/rp", "/recently-played"],
        description: "List only the last 30 recently played videos.",
        action: (searchTerm, commandSegments) => {
          $.post({
            url: "/api/videos/recently-played/last30"
          }).done(data => {
            this.setState({
              searchResults: this.buildVideoResults(data),
              manage: false
            });
          });
        }
      },
      {
        commands: ["/rps", "/recently-played-search"],
        description: "Search recently played vidoes.",
        action: (searchTerm, commandSegments) => {
          $.post({
            url: "/api/videos/recently-played/search",
            data: { searchTerm: _.slice(commandSegments, 1).join(" ") }
          }).done(data => {
            this.setState({
              searchResults: this.buildVideoResults(data),
              manage: false
            });
          });
        }
      },
      {
        commands: ["/trimrp", "trim-recently-played"],
        description:
          "Trim recently played videos in the database to the last 30.",
        action: (searchTerm, commandSegments) => {
          $.post({
            url: "/api/videos/recently-played/last30",
            data: { trim: true }
          }).done(data => {
            this.setState({
              searchResults: this.buildVideoResults(data),
              manage: false
            });
          });
        }
      },
      {
        commands: ["/manage"],
        description:
          "Switch mode to manage which allows you to edit groups videos belong to or delete them.",
        action: (searchTerm, commandSegments) => {
          $.ajax({
            url: "/api/videos"
          }).done(data => {
            this.setState({
              searchResults: this.buildVideoResults(data),
              manage: true
            });
          });
        }
      },
      {
        commands: ["/filter"],
        description:
          "Switch thumbnails and video to a user specified filter: monochrome, saturate, sepia and normal",
        action: (searchTerm, commandSegments) => {
          if (commandSegments.length > 0) {
            switch (commandSegments[1]) {
              case "monochrome":
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
        }
      }
    ];
  }
  private onCommandEntered(searchTerm: string): void {
    const commandSegments: string[] = searchTerm.split(" ");

    const command: ICommand = _.find(this.commands, c => {
      return _.indexOf(c.commands, commandSegments[0]) > -1;
    });

    if (command) {
      command.action(searchTerm, commandSegments);
    } else {
      this.performSearch(searchTerm, "/api/videos/youtube/search");
    }
  }
  private onAddVideoButtonClick(video: IVideoEntry, group: string): void {
    let found = _.find(this.state.searchResults, { ytid: video.ytid });

    if (found !== undefined) {
      found.isArchived = true;

      $.post({
        url: "/api/videos/add",
        data: {
          title: video.title,
          ytid: video.ytid,
          group: group !== undefined ? group : "misc"
        }
      });
    }
  }
  private onUpdateVideoButtonClick(video: IVideoEntry, group: string): void {
    let found = _.find(this.state.searchResults, { ytid: video.ytid });

    if (found !== undefined) {
      found.isArchived = true;
      found.title = video.title;

      $.post({
        url: "/api/videos/update",
        data: {
          title: video.title,
          ytid: video.ytid,
          group: group !== undefined ? group : "misc"
        }
      });
    }
  }
  private onDeleteVideoButtonClick(video: IVideoEntry): void {
    const found = _.find(this.state.searchResults, { ytid: video.ytid });

    if (found !== undefined) {
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
  private playVideo(video: IVideoEntry): void {
    this.setState({
      currentVideo: video,
      // searchResults: data,
      manage: false
    });

    if (video.title !== undefined && video.title.length > 0) {
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

    if (
      this.state.searchResults !== undefined &&
      this.state.searchResults.length > 0
    ) {
      versionDisplay = false;
    }

    if (this.state.gridView) {
      view = (
        <VideoListGrid
          data={this.state.searchResults}
          applyFilter={this.state.applyFilter}
        />
      );
    } else {
      view = (
        <VideoList
          data={this.state.searchResults}
          groups={this.state.groups}
          manage={this.state.manage}
          applyFilter={this.state.applyFilter}
          onAddVideoButtonClick={this.onAddVideoButtonClick}
          onUpdateVideoButtonClick={this.onUpdateVideoButtonClick}
          onDeleteVideoButtonClick={this.onDeleteVideoButtonClick}
        />
      );
    }

    return (
      <div>
        <CommandInput
          onKeyEnter={this.onCommandEntered}
          placeHolder="Search YouTube or your saved videos..."
        />
        {view}
        <YouTube
          video={this.state.currentVideo}
          applyFilter={this.state.applyFilter}
          socket={this.socket}
        />
        <Version
          display={versionDisplay}
          info={this.state.tobyVersionInfo.version}
        />
      </div>
    );
  }
}

$(document).ready(() => {
  ReactDOM.render(<Toby />, document.getElementById("ui"));
});
