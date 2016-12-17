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

import { IVideoGroup, 
         IVideoEntry,         
         ISearchResults } from "./infrastructure";

export interface VideoListProps {
  data: ISearchResults[],
  groups: string[],
  applyFilter: string,
  onVideoButtonClick(e: any): void,
  onUpdateButtonClick(e: any): void,
  onDeleteButtonClick(e: any): void
}

export class VideoList extends React.Component<{}, {}> {
  constructor() {
    super();

    // this.onAddVideoButtonHandler = this.onAddVideoButtonHandler.bind(this);
    // this.onUpdateVideoButtonHandler = this.onUpdateVideoButtonHandler.bind(this);
    // this.onDeleteVideoButtonHandler = this.onDeleteVideoButtonHandler.bind(this);

    // this.state = {
    //   data: [],
    //   applyFilter: "",
    //   onAddVideoButtonHandler: () => {},
    //   onUpdateVideoButtonHandler: () => {},
    //   onDeleteVideoButtonHandler: () => {}
    // };
  }
  componentDidMount() {
    // let $videoListTable = $("#videoListTable");

    // const resizeTable = () => {
    //   $videoListTable.css("width", window.innerWidth - 25);
    // };

    // window.addEventListener("resize", (e) => { resizeTable(); });

    // resizeTable();

    // this.updateViewBasedOnProps(this.props);
  }
  render() {
    // let videoResults = this.state.data.map((d, i) => {
    //   let addButton = "",
    //       manageButton = "",
    //       addButtonColSpan = "",
    //       borderRight = "",
    //       dropDownClass = "groupDropDown";

    //   if(d.isArchived === false ||
    //      d.justAdded === true) {
    //     let clickHandler = this.onAddVideoButtonHandler,
    //         addButtonClass = "manageButton fa fa-star-o";

    //     if (d.justAdded) {
    //       clickHandler = (e) => { e.preventDefault(); e.stopPropagation(); };
    //       dropDownClass = "groupDropDownDisabled";
    //       addButtonClass = "manageButton fa fa-star";
    //       // onDropDownChange={this.onDropDownChange}
    //       addButton =  <td className="border-right buttonContainerWidth"><span>
    //           <DropDown disabled={true} name={"groupSelector-" + d.ytid } items={this.state.items} className={dropDownClass} />
    //           <a href="#" id={"star-" + d.ytid} onClick={clickHandler} className={addButtonClass}></a>
    //         </span></td>;
    //     } else {
    //       // onDropDownChange={this.onDropDownChange}
    //       addButton =
    //         <td className="border-right buttonContainerWidth"><span>
    //           <DropDown name={"groupSelector-" + d.ytid } items={this.state.items} className={dropDownClass} />
    //           <a href="#" id={"star-" + d.ytid} onClick={clickHandler} className={addButtonClass}></a>
    //         </span></td>;
    //     }
    //   } else if (this.state.manage) {
    //     let deleteButtonClass = "manageButton fa fa-trash",
    //         updateButtonClass = "manageButton fa fa-wrench";

    //     manageButton =
    //       <td className="border-right buttonContainerWidth"><span>
    //         <DropDown name={"groupSelector-" + d.ytid } selected={d.group} items={this.state.items} className={dropDownClass} onDropDownChange={this.onDropDownChange} />
    //         <a href="#" id={"star-" + d.ytid} onClick={this.onUpdateVideoButtonHandler} className={updateButtonClass}></a>
    //         <a href="#" id={"star-" + d.ytid} onClick={this.onDeleteVideoButtonHandler} className={deleteButtonClass}></a>
    //       </span></td>;
    //   } else {
    //      addButtonColSpan = "2";
    //      borderRight = "border-right";
    //   }

    //   return (
    //     <tr>
    //       <td className="border-left thumbnailIMGWidth" onClick={d.playVideo.bind(this, d)}><img className={"videoThumbnail " + this.state.applyFilter} src={d.thumbnail}></img></td>
    //       <td className={"textAlignMiddle " + borderRight} colSpan={addButtonColSpan} onClick={d.playVideo.bind(this, d, this.state.data)}>{d.title}</td>
    //       {addButton}
    //       {manageButton}
    //     </tr>
    //   );
    // });

    //<table id="videoListTable">{videoResults}</table>
    return (
      <div className="content-panel">        
      </div>
    )
  }
}