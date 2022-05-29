'use strict';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = res.json();

  return data;
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

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
    'X-RapidAPI-Key': '800d1c77edmsh142906e4c64c9efp1dacc1jsn17c97fdb6965',
  },
};

fetch(
  'https://shazam.p.rapidapi.com/search?term=love&locale=en-US&offset=0&limit=20',
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
