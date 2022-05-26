'use strict';

const expenseListEl = document.getElementById('list');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('money-plus');
const expenseEl = document.getElementById('money-minus');
const formEl = document.getElementById('form');
const testInput = document.getElementById('text');

// const dummyTransactions = [
//   { id: 1, title: 'Salary', amount: 300 },
//   { id: 2, title: 'Tax', amount: -50 },
//   { id: 3, title: 'Camera', amount: -100 },
//   { id: 4, title: 'Gift', amount: 233 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions = localStorageTransactions || [];

function displayTransations(transaction) {
  const sign = transaction.amount > 0 ? '+' : '-';

  const li = `
    <li class="${transaction.amount > 0 ? 'plus' : 'minus'}">
      ${transaction.title} <span>${sign}$${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" data-expenseID="${
    transaction.id
  }">x</button>
    </li>
  `;
  expenseListEl.insertAdjacentHTML('beforeend', li);
}

function displayBalanse() {
  const total = transactions
    .map((item) => item.amount)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  const income = transactions
    .map((item) => item.amount)
    .filter((item) => item > 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  const expense = (
    transactions
      .map((item) => item.amount)
      .filter((item) => item < 0)
      .reduce((acc, cur) => acc + cur, 0) * -1
  ).toFixed(2);

  balanceEl.textContent = `$${total}`;
  incomeEl.textContent = `+$${income}`;
  expenseEl.textContent = `-$${expense}`;
}

function init() {
  expenseListEl.innerHTML = '';
  transactions.forEach(displayTransations);
  displayBalanse();
}

function deleteTransation(e) {
  if (!e.target.classList.contains('delete-btn')) {
    return;
  }
  const transactionId = +e.target.dataset.expenseid;
  transactions = transactions.filter((item) => item.id !== transactionId);
  updateLocalStorage();
  init();
}

function addTransaction(e) {
  e.preventDefault();

  const title = new FormData(e.target).get('title');
  const amount = new FormData(e.target).get('amount');

  if (title.trim() === '' || amount.trim() === '') {
    alert('Please enter text and amount!');
  } else {
    const newTransaction = {
      id: createID(),
      title,
      amount: +amount,
    };

    transactions.push(newTransaction);
    updateLocalStorage();
    init();

    formEl.reset();
    testInput.focus();
  }
}

function createID() {
  return Math.floor(Math.random() * 1e6);
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

expenseListEl.addEventListener('click', deleteTransation);
formEl.addEventListener('submit', addTransaction);

init();
