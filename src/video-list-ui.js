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

    //<button id={d.ytid} onClick={this.onAddVideoButtonHandler} style={style} >Bookmark</button>

    this.setState({
      data: nextProps.data.map(function(d, i) {
        return {
          playVideo: d.playVideo,
          title: d.title,
          ytid: d.ytid,
          thumbnail: d.thumbnail,
          isArchived: d.isArchived,
          addVideoButton: (!d.isArchived) ?
            <span>
              <DropDown name={"groupSelector-" + d.ytid } items={items} className="groupDropDown" onDropDownChange={this.onDropDownChange} />
              <a href="#" id={d.ytid} onClick={this.onAddVideoButtonHandler} className="star">
                <i className="fa fa-star-o"></i>
              </a>
            </span>
            : ""
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
      customAddVideoButtonHandler: (nextProps.addVideoButtonHandler !== undefined) ? nextProps.addVideoButtonHandler : function(video) {}
    });
  }
  onAddVideoButtonHandler(e) {
    e.preventDefault();

    let video = _.find(this.state.addButtonItems, { "ytid": e.target.id });

    if(this.state.customAddVideoButtonHandler !== undefined && video !== undefined) {
      this.state.customAddVideoButtonHandler(video);

      let _d = _.forEach(this.state.data, function(d) {
        if (d.ytid === e.target.id) {
          d.addVideoButton = "";
        }
      });

      this.setState({ data: _d });
    }
  }
  onDropDownChange(selected) {
    console.log(`video-list-ui.js: ${selected}`);
  }
  render() {
    let videoResults = this.state.data.map((d, i) => {
      let addButton = "",
          addButtonColSpan = "",
          borderRight = "";
      if(d.addVideoButton !== "") {
        addButton = <td className="border-right buttonContainerWidth">{d.addVideoButton}</td>
      } else {
        addButtonColSpan = "2";
        borderRight = "border-right";
      }

      return (
        <tr>
          <td className="border-left thumbnailIMGWidth" onClick={d.playVideo.bind(this, d)}><img className={"videoThumbnail " + this.state.applyFilter} src={d.thumbnail}></img></td>
          <td className={"textAlignMiddle " + borderRight} colSpan={addButtonColSpan} onClick={d.playVideo.bind(this, d)}>{d.title}</td>
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
