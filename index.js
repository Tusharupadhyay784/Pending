var player;
 
let form = document.getElementById("form");
 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  url = document.getElementById("url").value;
  console.log(url);
  videoId = YouTubeGetID(url);
  youTubePlayerChangeVideoId(videoId);
});
 
function youTubePlayerCurrentTimeChange(currentTime) {
 
    player.currentTimeSliding = false;
        player.seekTo(currentTime*player.getDuration()/100, true);
    
}
 
function youTubePlayerVolumeChange(volume) {
        player.setVolume(volume);
}
 
function youTubePlayerCurrentTimeSlide() {
 
    player.currentTimeSliding = true;
}
 
function pauseVideo() {
  player.pauseVideo();
}
function playVideo() {
  player.playVideo();
}
 
function YouTubeGetID(url) {
  var ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}
 
function youTubePlayerChangeVideoId(videoId) {
  player.cueVideoById({ suggestedQuality: "tiny", videoId: videoId });
  player.pauseVideo();
}
 
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: 500,
    width: 900,
    videoId: "8KrO5akeQgI",
    playerVars: {
      playsinline: 1,
      autoplay: 0,
      controls: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}
 
function onPlayerReady() {
  console.log(true);
}
 
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}