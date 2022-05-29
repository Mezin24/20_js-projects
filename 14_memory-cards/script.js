'use strict';

const cardContainer = document.getElementById('cards-container');
const currentLabel = document.getElementById('current');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const addCardBtn = document.getElementById('add-card');
const showFormBtn = document.getElementById('show-form');
const addContainer = document.getElementById('add-container');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const clearBtn = document.getElementById('clear');

let currentCard = 0;

const cardsEls = [];

const cardsData = getCardsFromLocalStorage();

createCards();

function getCardsFromLocalStorage() {
  const card = JSON.parse(localStorage.getItem('memoryCards'));

  return card !== null ? card : [];
}

function updateLS(cardsData) {
  localStorage.setItem('memoryCards', JSON.stringify(cardsData));
}

function createCards() {
  cardsData.forEach(createCard);
  updateNavigation();
}

function createCard(data, item) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = ` 
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
    </div>
  `;

  if (item === 0) {
    card.classList.add('active');
  }

  card.addEventListener('click', rotateCard);
  cardContainer.append(card);
  cardsEls.push(card);
}

function rotateCard() {
  this.classList.toggle('show-answer');
}

function updateNavigation() {
  currentLabel.textContent = `${
    cardsData.length !== 0 ? currentCard + 1 : 0
  } / ${cardsData.length}`;
}

nextBtn.addEventListener('click', () => {
  if (currentCard === cardsData.length - 1 || cardsData.length === 0) return;

  cardsEls[currentCard].className = 'card left';

  currentCard++;

  cardsEls[currentCard].className = 'card active';
  updateNavigation();
});

prevBtn.addEventListener('click', () => {
  if (currentCard === 0) return;

  cardsEls[currentCard].className = 'card';

  currentCard--;

  cardsEls[currentCard].className = 'card active';
  updateNavigation();
});

showFormBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});
addCardBtn.addEventListener('click', () => {
  const question = questionInput.value;
  const answer = answerInput.value;

  if (question.trim() === '' || answer.trim() === '') {
    alert('Write your question and answer, please... ');
  }

  const newCard = { question, answer };
  cardsData.push(newCard);
  updateLS(cardsData);
  window.location.reload();
});

clearBtn.addEventListener('click', () => {
  localStorage.removeItem('memoryCards');
  window.location.reload();
});
