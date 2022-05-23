'use strict';

const currencyElOne = document.getElementById('currency-one');
const currencyElTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const swapBtn = document.getElementById('swap');
const rate = document.getElementById('rate');

function calculate() {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;
  const amount = amountOne.value;

  if (amount <= 0 || amountTwo.value <= 0) return;

  const myHeaders = new Headers();
  myHeaders.append('apikey', 'jswnptK1HuvIA78qHreOym9i3LdXGktn');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${currencyTwo}&from=${currencyOne}&amount=${amount}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((data) => {
      const { result } = data;

      amountTwo.value = result.toFixed(2);
      rate.textContent = `1 ${currencyOne} = ${result} ${currencyTwo}`;
    });
}

currencyElOne.addEventListener('change', calculate);
currencyElTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);
swapBtn.addEventListener('click', () => {
  [currencyElOne.value, currencyElTwo.value] = [
    currencyElTwo.value,
    currencyElOne.value,
  ];

  calculate();
});

calculate();
