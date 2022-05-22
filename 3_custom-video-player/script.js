const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const range = document.getElementById('range');
const timestamp = document.getElementById('timestamp');

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (!video.paused) {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  }
}

function stopVideo() {
  video.pause();
  video.currentTime = 0;
}

function updateVideoProgress() {
  range.value = (video.currentTime / video.duration) * 100;
  updateTimestamp();
}

function setVideoProgress() {
  video.currentTime = (+range.value * video.duration) / 100;
  updateTimestamp();
}

function addZero(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function updateTimestamp() {
  const mins = Math.floor(video.currentTime / 60);
  const secs = Math.floor(video.currentTime % 60);

  timestamp.textContent = `${addZero(mins)}:${addZero(secs)}`;
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateVideoProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);

range.addEventListener('change', setVideoProgress);
