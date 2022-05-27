'use strict';

const musicContainer = document.querySelector('.music-container');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const songs = ['hey', 'summer', 'ukulele'];
let currentSong = 1;
let isPlayed = false;

loadSong(songs[currentSong]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  isPlayed = audio.paused;

  if (!isPlayed) {
    musicContainer.classList.remove('play');
    audio.pause();
    playBtn.querySelector('.fa').classList.remove('fa-pause');
    playBtn.querySelector('.fa').classList.add('fa-play');
  } else {
    musicContainer.classList.add('play');
    audio.play();
    playBtn.querySelector('.fa').classList.remove('fa-play');
    playBtn.querySelector('.fa').classList.add('fa-pause');
  }
}

function nextSong() {
  currentSong++;

  if (currentSong > songs.length - 1) {
    currentSong = 0;
  }
  loadSong(songs[currentSong]);

  if (isPlayed) {
    playSong();
  }
}
function prevSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(songs[currentSong]);
  if (isPlayed) {
    playSong();
  }
}

function timeUpdate(e) {
  const { duration, currentTime } = e.srcElement;

  progress.style.width = `${(currentTime / duration) * 100}%`;
}

function selectTime(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', playSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', timeUpdate);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', selectTime);
