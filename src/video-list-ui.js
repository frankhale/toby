class VideoList extends React.Component {
  constructor() {
    super();

    this.onAddVideoButtonHandler = this.onAddVideoButtonHandler.bind(this);
    this.onDropDownChange = this.onDropDownChange.bind(this);

    this.state = {
      data: [],
      applyFilter: "",
      addButtonItems: [],
      customAddVideoButtonHandler: function(video) {}
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

    this.setState({
      items: items,
      data: nextProps.data.map(function(d, i) {
        return {
          playVideo: d.playVideo,
          title: d.title,
          ytid: d.ytid,
          thumbnail: d.thumbnail,
          isArchived: d.isArchived,
          justAdded: (d.justAdded !== undefined) ? d.justAdded : false
        };
      }.bind(this)),
      applyFilter: (nextProps.applyFilter !== undefined) ? nextProps.applyFilter : "",
      addButtonItems: nextProps.data.map(function(d, i) {
        if(!d.isArchived) {
          return {
            title: d.title,
            ytid: d.ytid
          };
        }
      }),
      customAddVideoButtonHandler: (nextProps.addVideoButtonHandler !== undefined) ? nextProps.addVideoButtonHandler : function() {}
    });

    console.log("Finished componentWillReceiveProps...");
  }
  onAddVideoButtonHandler(e) {
    e.preventDefault();

    let id = $(e.target).prop("id").replace("star-", "");
    let video = _.find(this.state.addButtonItems, { "ytid": id });
    let group = $(`#groupSelector-${video.ytid}`).val();

    if(group === "-1") return;

    if(this.state.customAddVideoButtonHandler !== undefined && video !== undefined) {
      this.state.customAddVideoButtonHandler(video, group);

      let _d = _.forEach(this.state.data, function(d) {
        if (d.ytid === id) {
          d.justAdded=true;
        }
      });

      this.setState({ data: _d });
    }
  }
  onDropDownChange(selected, id) {
    console.log(`video-list-ui.js: ${selected}`);
  }
  render() {
    let videoResults = this.state.data.map((d, i) => {
      let addButton = "",
          addButtonColSpan = "",
          borderRight = "";

      if(d.isArchived === false ||
         d.justAdded === true) {
        let clickHandler = this.onAddVideoButtonHandler,
            dropDownClass = "groupDropDown",
            addButtonClass = "starButton fa fa-star-o";

        if (d.justAdded) {
          clickHandler = function(e){ e.preventDefault(); e.stopPropagation(); };
          dropDownClass = "groupDropDownDisabled";
          addButtonClass = "starButton fa fa-star";
          addButton =  <td className="border-right buttonContainerWidth"><span>
              <DropDown disabled={true} name={"groupSelector-" + d.ytid } items={this.state.items} className={dropDownClass} onDropDownChange={this.onDropDownChange} />
              <a href="#" id={"star-" + d.ytid} onClick={clickHandler} className={addButtonClass}></a>
            </span></td>;
        } else {
          addButton =
            <td className="border-right buttonContainerWidth"><span>
              <DropDown name={"groupSelector-" + d.ytid } items={this.state.items} className={dropDownClass} onDropDownChange={this.onDropDownChange} />
              <a href="#" id={"star-" + d.ytid} onClick={clickHandler} className={addButtonClass}></a>
            </span></td>;
        }
      } else {
         addButtonColSpan = "2";
         borderRight = "border-right";
      }

      return (
        <tr>
          <td className="border-left thumbnailIMGWidth" onClick={d.playVideo.bind(this, d)}><img className={"videoThumbnail " + this.state.applyFilter} src={d.thumbnail}></img></td>
          <td className={"textAlignMiddle " + borderRight} colSpan={addButtonColSpan} onClick={d.playVideo.bind(this, d, this.state.data)}>{d.title}</td>
          {addButton}
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
