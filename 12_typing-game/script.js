'use strict';

const wordEl = document.getElementById('word');
const textEl = document.getElementById('text');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const difficultyEl = document.getElementById('difficulty');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settingsEl = document.getElementById('settings');

let score = 0;
let time = 10;
let randomWord;
textEl.focus();

let difficulty =
  localStorage.getItem('typeDifficulty') !== null
    ? localStorage.getItem('typeDifficulty')
    : 'easy';
difficultyEl.value = difficulty;

let timeInterval = setInterval(updateTime, 1000);

displayWord();

async function getRandomWord() {
  const res = await fetch('https://random-word-api.herokuapp.com/word');
  const data = await res.json();
  return data;
}

async function displayWord() {
  [randomWord] = await getRandomWord();
  wordEl.textContent = randomWord;
}

function updateScore() {
  scoreEl.textContent = score;
}

function updateTime() {
  time--;
  timeEl.textContent = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    endGame();
  }
}

function endGame() {
  endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick=location.reload()>Reload</button>
  `;

  endGameEl.style.display = 'flex';
}

textEl.addEventListener('input', (e) => {
  const { value } = e.target;
  if (value === randomWord) {
    displayWord();
    score++;
    updateScore();
    textEl.value = '';

    if (difficulty === 'easy') {
      time += 10;
    } else if (difficulty === 'medium') {
      time += 5;
    } else {
      time += 3;
    }
  }
});

settingsBtn.addEventListener('click', () => {
  settingsEl.classList.toggle('hide');
});

settingsEl.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('typeDifficulty', difficulty);
});
