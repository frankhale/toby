// video-list-ui.js
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

class VideoList extends React.Component {
  constructor() {
    super();

    this.onAddVideoButtonHandler = this.onAddVideoButtonHandler.bind(this);
    this.onUpdateVideoButtonHandler = this.onUpdateVideoButtonHandler.bind(this);
    this.onDeleteVideoButtonHandler = this.onDeleteVideoButtonHandler.bind(this);
    //this.onDropDownChange = this.onDropDownChange.bind(this);

    this.state = {
      data: [],
      applyFilter: "",
      onAddVideoButtonHandler: function() {},
      onUpdateVideoButtonHandler: function() {},
      onDeleteVideoButtonHandler: function() {}
    };
  }
  componentDidMount() {
    let $videoListTable = $("#videoListTable");

    var resizeTable = function() {
      $videoListTable.css("width", window.innerWidth - 25);
    };

    window.addEventListener("resize", function(e) {
      resizeTable();
    });

    resizeTable();
  }
  componentWillReceiveProps(nextProps) {
    let items = [
      {
        name: "-Select Group-",
        value: "-1",
        action: function() {}
      }
    ];

    if(nextProps.groups !== undefined) {
      _.forEach(nextProps.groups, function(g) {
        if(g.group !== "Recently Played") {
          items.push({
            name: g.group,
            value: g.group,
            action: function() { }
          });
        }
      });
    }

    let videos = [];

    if(nextProps.data !== undefined && nextProps.data.length > 0) {
      videos = nextProps.data.map(function(d, i) {
        //console.log(d);

        return {
          playVideo: d.playVideo,
          title: d.title,
          ytid: d.ytid,
          group: d.group,
          thumbnail: d.thumbnail,
          isArchived: d.isArchived,
          justAdded: (d.justAdded !== undefined) ? d.justAdded : false
        };
      }.bind(this));
    }

    this.setState({
      items: items,
      data: videos,
      applyFilter: (nextProps.applyFilter !== undefined) ? nextProps.applyFilter : "",
      onAddVideoButtonHandler: nextProps.addVideoButtonHandler,
      onUpdateVideoButtonHandler: nextProps.updateVideoButtonHandler,
      onDeleteVideoButtonHandler: nextProps.deleteVideoButtonHandler,
      manage: nextProps.manage
    });
  }
  onAddVideoButtonHandler(e) {
    e.preventDefault();

    let id = $(e.target).prop("id").replace("star-", ""),
        video = _.find(this.state.data, { "ytid": id }),
        group = $(`#groupSelector-${video.ytid}`).val();

    if(group === "-1") return;

    if(this.state.onAddVideoButtonHandler !== undefined && video !== undefined) {
      this.state.onAddVideoButtonHandler(video, group);

      let _d = _.forEach(this.state.data, (d) => {
        if (d.ytid === id) {
          d.justAdded=true;
        }
      });

      this.setState({ data: _d });
    }
  }
  onUpdateVideoButtonHandler(e) {
    e.preventDefault();

    //console.log($(e.target).prop("id").replace("star-", ""));

    let id = $(e.target).prop("id").replace("star-", ""),
        video = _.find(this.state.data, { "ytid": id }),
        group = $(`#groupSelector-${video.ytid}`).val();

    if(group === "-1") return;

    if(this.state.onUpdateVideoButtonHandler !== undefined && video !== undefined) {
      this.state.onUpdateVideoButtonHandler(video, group);
    }
  }
  onDeleteVideoButtonHandler(e) {
    e.preventDefault();

    let id = $(e.target).prop("id").replace("star-", ""),
        video = _.find(this.state.data, { "ytid": id });

    if(this.state.onDeleteVideoButtonHandler !== undefined && video !== undefined) {
      this.state.onDeleteVideoButtonHandler(video);

      this.setState({
        data: _.reject(data, { ytid: video.ytid })
      });
    }
  }
  //onDropDownChange(selected, id) {
    //console.log(`video-list-ui.js: ${selected}`);
  //}
  render() {
    let videoResults = this.state.data.map((d, i) => {
      let addButton = "",
          manageButton = "",
          addButtonColSpan = "",
          borderRight = "",
          dropDownClass = "groupDropDown";

      if(d.isArchived === false ||
         d.justAdded === true) {
        let clickHandler = this.onAddVideoButtonHandler,
            addButtonClass = "manageButton fa fa-star-o";

        if (d.justAdded) {
          clickHandler = function(e){ e.preventDefault(); e.stopPropagation(); };
          dropDownClass = "groupDropDownDisabled";
          addButtonClass = "manageButton fa fa-star";
          // onDropDownChange={this.onDropDownChange}
          addButton =  <td className="border-right buttonContainerWidth"><span>
              <DropDown disabled={true} name={"groupSelector-" + d.ytid } items={this.state.items} className={dropDownClass} />
              <a href="#" id={"star-" + d.ytid} onClick={clickHandler} className={addButtonClass}></a>
            </span></td>;
        } else {
          // onDropDownChange={this.onDropDownChange}
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
            <DropDown name={"groupSelector-" + d.ytid } selected={d.group} items={this.state.items} className={dropDownClass} onDropDownChange={this.onDropDownChange} />
            <a href="#" id={"star-" + d.ytid} onClick={this.onUpdateVideoButtonHandler} className={updateButtonClass}></a>
            <a href="#" id={"star-" + d.ytid} onClick={this.onDeleteVideoButtonHandler} className={deleteButtonClass}></a>
          </span></td>;
      } else {
         addButtonColSpan = "2";
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
    )
  }
}
