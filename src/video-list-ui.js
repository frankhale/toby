class VideoList extends React.Component {
  constructor() {
    super();

    this.onAddVideoButtonHandler = this.onAddVideoButtonHandler.bind(this);

    this.state = {
      data: [],
      applyFilter: "",
      addButtonItems: [],
      customAddVideoButtonHandler: function(video) {}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data.map(function(d, i) {
        return {
          playVideo: d.playVideo,
          title: d.title,
          ytid: d.ytid,
          thumbnail: d.thumbnail,
          isArchived: d.isArchived,
          addVideoButton: (!d.isArchived) ? <button id={d.ytid} className="addVideoButton" onClick={this.onAddVideoButtonHandler}>Bookmark</button> : ""
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
  componentDidMount() {
    var resizeHighlight = function() {
      $(".highlightRow").css("width", window.innerWidth - 25);
      $(".videoTitle").css("width", window.innerWidth - 100);
    };

    window.addEventListener("resize", function(e) {
      resizeHighlight();
    });
  }
  onAddVideoButtonHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    let video = _.find(this.state.addButtonItems, { "ytid": e.target.id });

    if(this.state.customAddVideoButtonHandler !== undefined && video !== undefined) {
      this.state.customAddVideoButtonHandler(video);

      let _d = _.forEach(this.state.data, function(d) {
        if (d.ytid === e.target.id) {
          d.addVideoButton = "";
        }
      });

      this.setState({
        data: _d
      });
    }
  }
  render() {
    let highlightRowStyle = {
      width: window.innerWidth - 25
    };

    let videoTitleStyle = {
      width: window.innerWidth - 100
    };

    let imgStyle = {
      width: "100%",
      height: "100%"
    };

    let videoResults = this.state.data.map((d, i) => {
      return (
        <div className="highlightRow" style={highlightRowStyle} onClick={d.playVideo.bind(this, d)}>
          <div className={"alignDiv videoThumbnail " + this.state.applyFilter}>
            <img src={d.thumbnail} style={imgStyle}></img>
          </div>
          <div className="alignDiv videoTitle" style={videoTitleStyle}>
            {d.title}
            {d.addVideoButton}
          </div>
        </div>
      );
    });

    return (
      <div className="content-panel">
      {videoResults}
      </div>
    )
  }
}
