// YouTube API Documentation:
// https://developers.google.com/youtube/iframe_api_reference

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var socket = io('http://localhost:5150'),
    apiReady = false,
    player,
    video_title;

socket.on('play', function(ytid) {
  if(apiReady === false ||
     ytid === undefined ||
     ytid === '') return;

  if(player === undefined) {
    player = new YT.Player('player', {
      videoId: ytid,
      playerVars: { 'autoplay': 1 },
      events: {
       //'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
      }
    });
  } else {
    player.loadVideoById(ytid);
  }
});

//function onPlayerReady(event) {
//  console.log("youtube-player-ready");
//  event.target.playVideo();
//}

function onPlayerStateChange(event) {
  var data = event.target.getVideoData();
  var state = event.data;

  console.log(event);
  console.log("state: " + state);

  socket.emit('youtube-player-state-changed', {
    state: state,
    video_data: data
  });

  if(video_title !== data.title) {
    video_title = data.title;
    socket.emit('video-info', {
      title: data.title,
      video_id: data.video_id
    });
  }
}

function onYouTubeIframeAPIReady() {
  apiReady=true;
  socket.emit('youtube-api-ready');
}
