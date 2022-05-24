const wordEl = document.getElementById('word');
const popupEl = document.getElementById('popup-container');
const finalMsgEl = document.getElementById('final-message');

const urlApi = 'https://random-word-api.herokuapp.com/word';

let currentWord;
const correctletters = [];
const wrongLetters = [];

async function getRandomWord(url = urlApi) {
  const res = await fetch(url);
  const [word] = await res.json();

  currentWord = word;
  // currentWord = 'word';
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
  console.log(wordInner);
  if (wordInner === currentWord) {
    finalMsgEl.innerText = 'Congratulations! You won! 🙂';
    popupEl.style.display = 'flex';
  }
}

getRandomWord().then(() => displayWord());
