'use strict';

const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const millionersBtn = document.getElementById('millioners');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calc-wealth');
const mainEl = document.getElementById('main');

let data = [];

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const newUser = {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    wealth: Math.floor(Math.random() * 1e6),
  };

  addUser(newUser);
}

function updateUI(updatedData = data) {
  mainEl.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  updatedData.forEach((person) => {
    const el = document.createElement('div');
    el.classList.add('person');
    el.innerHTML = `<strong>${person.name}</strong> ${updateToMoney(
      person.wealth
    )}`;
    mainEl.append(el);
  });
}

function addUser(user) {
  data.push(user);
  updateUI();
}

function updateToMoney(num) {
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
  data = data.map((item) => ({ ...item, wealth: item.wealth * 2 }));
  updateUI();
}

function showMillioners() {
  data = data.filter((item) => item.wealth > 1e6);
  updateUI();
}

function sortByRichest() {
  data = data.sort((a, b) => b.wealth - a.wealth);
  updateUI();
}

function calcEntireWealth() {
  const wealthSum = data.reduce((acc, cur) => acc + cur.wealth, 0);

  const totalEl = document.createElement('h3');
  totalEl.innerHTML = `<strong>Total:</strong>${updateToMoney(wealthSum)}`;
  mainEl.append(totalEl);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
millionersBtn.addEventListener('click', showMillioners);
sortBtn.addEventListener('click', sortByRichest);
calcWealthBtn.addEventListener('click', calcEntireWealth);
