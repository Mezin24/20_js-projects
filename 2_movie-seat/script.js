'use strict';

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelection = document.getElementById('movie');
let moviePrice = +movieSelection.value;

populateData();

function updateSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));

  const selectedCount = selectedSeats.length;
  count.textContent = selectedCount;
  total.textContent = selectedCount * moviePrice;
}

function changeSelectedMovie(e) {
  const selectedPrice = e.target.value;
  moviePrice = +selectedPrice;

  localStorage.setItem('selectedMovie', e.target.selectedIndex);
  localStorage.setItem('selectedPrice', selectedPrice);

  updateSelectedSeats();
}

function populateData() {
  const selecteSeatsIndex = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selecteSeatsIndex !== null && selecteSeatsIndex.length !== 0) {
    seats.forEach((seat, index) => {
      if (selecteSeatsIndex.includes(index)) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovie = localStorage.getItem('selectedMovie');
  const selectedPrice = localStorage.getItem('selectedPrice');

  if (selectedMovie !== null) {
    movieSelection.selectedIndex = selectedMovie;
  }
  if (selectedPrice !== null) {
    moviePrice = selectedPrice;
  }

  updateSelectedSeats();
}

container.addEventListener('click', (e) => {
  if (
    !e.target.classList.contains('seat') ||
    e.target.classList.contains('occupied')
  ) {
    return;
  }
  e.target.classList.toggle('selected');
  updateSelectedSeats();
});

movieSelection.addEventListener('change', changeSelectedMovie);
