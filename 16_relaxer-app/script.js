'use strict';

const text = document.getElementById('text');
const container = document.getElementById('container');

const totalTime = 7500;
const breathe = (totalTime / 5) * 2;
const hold = totalTime / 5;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function breatheAnimation() {
  text.textContent = 'Breathe In';
  container.className = 'container grow';

  delay(breathe)
    .then(() => {
      text.textContent = 'Hold';
      return delay(hold);
    })
    .then(() => {
      text.textContent = 'Breath Out';
      container.className = 'container shrink';
    });
}
breatheAnimation();
setInterval(breatheAnimation, totalTime);
