// video-list-grid-ui.tsx - A video list grid React component for Toby
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

import { IVideoEntry, ISearchResults } from "./infrastructure";

export interface IViewListGridProps {
  data: ISearchResults[];
  applyFilter: string;
}

interface IViewListGridState {
  data?: ISearchResults[];
  applyFilter?: string;
}

export class VideoListGrid extends React.Component<
  IViewListGridProps,
  IViewListGridState
> {
  constructor() {
    super();

    this.state = {
      data: [],
      applyFilter: ""
    };
  }
  componentDidMount() {
    this.updateViewBasedOnProps(this.props);
  }
  componentWillReceiveProps(nextProps: IViewListGridProps) {
    this.updateViewBasedOnProps(nextProps);
  }
  private updateViewBasedOnProps(nextProps: IViewListGridProps): void {
    let videos: ISearchResults[] = [];

    if (nextProps.data !== undefined && nextProps.data.length > 0) {
      videos = nextProps.data.map((d, i) => {
        return {
          playVideo: d.playVideo,
          title: d.title,
          ytid: d.ytid,
          group: d.group,
          thumbnail: d.thumbnail,
          isArchived: d.isArchived
        };
      });
    }

    this.setState({
      data: videos,
      applyFilter:
        nextProps.applyFilter !== undefined ? nextProps.applyFilter : ""
    });
  }
  render() {
    return (
      <div>
        {this.state.data.map((d, i) => {
          return (
            <img
              src={d.thumbnail}
              title={d.title}
              key={i}
              className={"videoThumbnailSlim " + this.state.applyFilter}
              onClick={d.playVideo.bind(this, d, this.state.data)}
            />
          );
        })}
      </div>
    );
  }
}
