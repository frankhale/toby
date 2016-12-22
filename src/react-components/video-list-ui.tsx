// video-list-ui.tsx - A vertical video list React component for Toby
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
import * as $ from "jquery";
import * as _ from "lodash";

import { IDropDownItem, DropDown } from "./dropdown-ui";

import { IVideoGroup,
         IVideoEntry,
         ISearchResults } from "./infrastructure";

export interface IVideoListProps {
  data: ISearchResults[];
  groups: string[];
  applyFilter: string;
  onAddVideoButtonClick(video: IVideoEntry, group: string): void;
  onUpdateVideoButtonClick(video: IVideoEntry, group: string): void;
  onDeleteVideoButtonClick(video: IVideoEntry): void;
  manage?: boolean;
}

interface IVideoListState {
  items?: IDropDownItem[];
  data?: ISearchResults[];
  applyFilter?: string;
  onAddVideoButtonClick?: (video: IVideoEntry, group: string) => void;
  onUpdateVideoButtonClick?: (video: IVideoEntry, group: string) => void;
  onDeleteVideoButtonClick?: (video: IVideoEntry) => void;
  manage?: boolean;
}

export class VideoList extends React.Component<IVideoListProps, IVideoListState> {
  constructor() {
    super();

    this.onAddVideoButtonClick = this.onAddVideoButtonClick.bind(this);
    this.onUpdateVideoButtonClick = this.onUpdateVideoButtonClick.bind(this);
    this.onDeleteVideoButtonClick = this.onDeleteVideoButtonClick.bind(this);

    this.state = {
      data: [],
      applyFilter: ""
    };
  }
  componentDidMount() {
    let $videoListTable = $("#videoListTable");

    const resizeTable = () => {
      $videoListTable.css("width", window.innerWidth - 25);
    };

    window.addEventListener("resize", (e) => { resizeTable(); });

    resizeTable();

    this.updateViewBasedOnProps(this.props);
  }
  componentWillReceiveProps(nextProps: IVideoListProps) {
    this.updateViewBasedOnProps(nextProps);
  }
  private updateViewBasedOnProps(nextProps: IVideoListProps): void {
    let items: IDropDownItem[] = [
      {
        name: "-Select Group-",
        value: "-1",
        action: () => {}
      }
    ];

    if (nextProps.groups !== undefined) {
      _.forEach(nextProps.groups, (g) => {
        if (g !== "Recently Played") {
          items.push({
            name: g,
            value: g,
            action: () => {}
          });
        }
      });
    }

    let videos: ISearchResults[] = [];

    if (nextProps.data !== undefined && nextProps.data.length > 0) {
      videos = nextProps.data.map((d, i) => {
        // console.log(d);

        return {
          playVideo: d.playVideo,
          title: d.title,
          ytid: d.ytid,
          group: d.group,
          thumbnail: d.thumbnail,
          isArchived: d.isArchived,
          justAdded: (d.justAdded !== undefined) ? d.justAdded : false
        };
      });
    }

    this.setState({
      items: items,
      data: videos,
      applyFilter: (nextProps.applyFilter !== undefined) ? nextProps.applyFilter : "",
      onAddVideoButtonClick: nextProps.onAddVideoButtonClick,
      onUpdateVideoButtonClick: nextProps.onUpdateVideoButtonClick,
      onDeleteVideoButtonClick: nextProps.onDeleteVideoButtonClick,
      manage: nextProps.manage
    });
  }
  private onAddVideoButtonClick(e: any): void {
    e.preventDefault();

    let id = $(e.target).prop("id").replace("star-", ""),
        video = _.find(this.state.data, { "ytid": id }),
        group = $(`#groupSelector-${video.ytid}`).val();

    if (group === "-1") return;

    if (this.state.onAddVideoButtonClick !== undefined && video !== undefined) {
      this.state.onAddVideoButtonClick(video, group);

      let _d = _.forEach(this.state.data, (d) => {
        if (d.ytid === id) {
          d.justAdded = true;
        }
      });

      this.setState({ data: _d });
    }
  }
  private onUpdateVideoButtonClick(e: any): void {
    e.preventDefault();

    // console.log($(e.target).prop("id").replace("star-", ""));

    let id = $(e.target).prop("id").replace("star-", ""),
        video = _.find(this.state.data, { "ytid": id }),
        group = $(`#groupSelector-${video.ytid}`).val();

    if (group === "-1") return;

    if (this.state.onUpdateVideoButtonClick !== undefined && video !== undefined) {
      this.state.onUpdateVideoButtonClick(video, group);
    }
  }
  private onDeleteVideoButtonClick(e: any): void {
    e.preventDefault();

    let id = $(e.target).prop("id").replace("star-", ""),
        video = _.find(this.state.data, { "ytid": id });

    if (this.state.onDeleteVideoButtonClick !== undefined && video !== undefined) {
      this.state.onDeleteVideoButtonClick(video);

      this.setState({
        data: _.reject(this.state.data, { ytid: video.ytid })
      });
    }
  }
  render() {
    let videoResults = this.state.data.map((d, i) => {
      let addButton,
          manageButton,
          addButtonColSpan,
          borderRight,
          dropDownClass = "groupDropDown";

      if (d.isArchived === false ||
         d.justAdded === true) {
        let clickHandler = this.onAddVideoButtonClick,
            addButtonClass = "manageButton fa fa-star-o";

        if (d.justAdded) {
          clickHandler = (e: any) => { e.preventDefault(); e.stopPropagation(); };
          dropDownClass = "groupDropDownDisabled";
          addButtonClass = "manageButton fa fa-star";
          addButton = <td className="border-right buttonContainerWidth"><span>
              <DropDown disabled={true} name={"groupSelector-" + d.ytid } items={this.state.items} className={dropDownClass} />
              <a href="#" id={"star-" + d.ytid} onClick={clickHandler} className={addButtonClass}></a>
            </span></td>;
        } else {
          addButton =
            <td className="border-right buttonContainerWidth"><span>
              <DropDown name={"groupSelector-" + d.ytid } items={this.state.items} className={dropDownClass} />
              <a href="#" id={"star-" + d.ytid} onClick={clickHandler} className={addButtonClass}></a>
            </span></td>;
        }
      } else if (this.state.manage) {
        let deleteButtonClass = "manageButton fa fa-trash",
            updateButtonClass = "manageButton fa fa-wrench";

        manageButton =
          <td className="border-right buttonContainerWidth"><span>
            <DropDown name={"groupSelector-" + d.ytid } selected={d.group} items={this.state.items} className={dropDownClass} />
            <a href="#" id={"star-" + d.ytid} onClick={this.onUpdateVideoButtonClick} className={updateButtonClass}></a>
            <a href="#" id={"star-" + d.ytid} onClick={this.onDeleteVideoButtonClick} className={deleteButtonClass}></a>
          </span></td>;
      } else {
         addButtonColSpan = 2;
         borderRight = "border-right";
      }

      return (
        <tr>
          <td className="border-left thumbnailIMGWidth" onClick={d.playVideo.bind(this, d)}><img className={"videoThumbnail " + this.state.applyFilter} src={d.thumbnail}></img></td>
          <td className={"textAlignMiddle " + borderRight} colSpan={addButtonColSpan} onClick={d.playVideo.bind(this, d, this.state.data)}>{d.title}</td>
          {addButton}
          {manageButton}
        </tr>
      );
    });

    return (
      <div className="content-panel">
        <table id="videoListTable">{videoResults}</table>
      </div>
    );
  }
}