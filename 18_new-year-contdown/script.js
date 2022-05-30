'use strict';
const yearEl = document.getElementById('year');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const loadingEl = document.getElementById('loading');
const countdownEl = document.getElementById('countdown');

displayYear();

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

function calcTimeRemaining() {
  const currentYear = new Date().getFullYear();
  const destinationDate = new Date(`January 01, ${currentYear + 1} 00:00:00`);
  return destinationDate - new Date();
}

function displayYear() {
  const currentYear = new Date().getFullYear();
  yearEl.textContent = currentYear + 1;
}

function displayTimer() {
  const diff = calcTimeRemaining();
  if (diff < 0) {
    displayYear();
    return;
  }

  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = addZero(days);
  hoursEl.textContent = addZero(hours);
  minutesEl.textContent = addZero(minutes);
  secondsEl.textContent = addZero(seconds);
}

setTimeout(() => {
  loadingEl.style.display = 'none';
  countdownEl.style.display = 'flex';
}, 1000);

setInterval(displayTimer, 1000);
