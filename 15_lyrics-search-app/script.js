'use strict';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = res.json();

  console.log(data);
  // return data;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searctTerm = search.value.trim();

  if (!searctTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searctTerm);
  }
});
