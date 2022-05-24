const wordEl = document.getElementById('word');
const popupEl = document.getElementById('popup-container');
const finalMsgEl = document.getElementById('final-message');
const notificationEl = document.getElementById('notification-container');
const wrongEl = document.getElementById('wrong-letters');
const playBtn = document.getElementById('play-button');

const figurePartsEls = document.querySelectorAll('.figure-part');

const urlApi = 'https://random-word-api.herokuapp.com/word';

let currentWord;
const correctletters = [];
const wrongLetters = [];

async function getRandomWord(url = urlApi) {
  const res = await fetch(url);
  const [word] = await res.json();

  currentWord = word;
}

function displayWord() {
  wordEl.innerHTML = `
    ${currentWord
      .split('')
      .map(
        (letter) =>
          `<span class="letter">${
            correctletters.includes(letter) ? letter : ''
          }</span>`
      )
      .join('')}
  `;

  const wordInner = wordEl.innerText.replace(/\n/g, '');
  if (wordInner === currentWord) {
    finalMsgEl.innerText = 'Congratulations! You won! 🙂';
    popupEl.style.display = 'flex';
  }
}

function updateWrongLetters() {
  if (wrongLetters.length > 0) {
    wrongEl.innerHTML = `
      <p>Wrong</p>
      ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

    if (figurePartsEls.length > wrongLetters.length) {
      figurePartsEls.forEach((item, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    } else {
      finalMsgEl.innerText = `You Loose! 😔 The secret word was ${currentWord}`;
      popupEl.style.display = 'flex';
    }
  } else {
    wrongEl.innerHTML = '';
  }
}

function showNotification() {
  notificationEl.classList.add('show');

  setTimeout(() => notificationEl.classList.remove('show'), 2000);
}

window.addEventListener('keydown', (e) => {
  const { key, keyCode } = e;

  if (keyCode < 65 || keyCode > 90) {
    return;
  }

  if (currentWord.includes(key)) {
    if (!correctletters.includes(key)) {
      correctletters.push(key);

      displayWord();
    } else {
      showNotification();
    }
  } else {
    if (wrongLetters.includes(key)) {
      showNotification();
    } else {
      wrongLetters.push(key);
      updateWrongLetters();
    }
  }
});

playBtn.addEventListener('click', () => {
  wrongLetters.splice(0);
  correctletters.splice(0);

  updateWrongLetters();
  popupEl.style.display = 'none';
  figurePartsEls.forEach((item) => (item.style.display = 'none'));
  getRandomWord().then(() => displayWord());
});

getRandomWord().then(() => displayWord());
