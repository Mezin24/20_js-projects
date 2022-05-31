'use strict';

const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listItems = [];

let dragStartIndex;
createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => b.sort - a.sort)
    .forEach(({ value: person }, index) => {
      const li = document.createElement('li');
      // li.classList.add('over');

      li.dataset.index = index;
      li.innerHTML = ` 
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(li);

      draggableList.append(li);
    });

  addEventLitenners();
}

function dragStart() {
  dragStartIndex = +this.closest('li').dataset.index;
}

function dragEnter() {
  this.classList.add('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove('over');
}

function dragDrop(e) {
  const dropIndex = +this.dataset.index;
  listItems[dropIndex].classList.remove('wrong');
  listItems[dragStartIndex].classList.remove('wrong');
  listItems[dropIndex].classList.remove('right');
  listItems[dragStartIndex].classList.remove('right');

  switchItems(listItems[dragStartIndex], listItems[dropIndex]);
}

function switchItems(fromItem, toItem) {
  toItem.appendChild(fromItem.querySelector('.draggable'));
  fromItem.appendChild(toItem.querySelector('.draggable'));

  // toItem.classList.remove('over');
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector('.person-name').textContent;
    item.classList.remove('wrong');
    item.classList.remove('right');

    if (personName !== richestPeople[index]) {
      item.classList.add('wrong');
    } else {
      item.classList.add('right');
    }
  });
}

function addEventLitenners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
  });
  dragItems.forEach((item) => {
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', dragDrop);
  });
}

checkBtn.addEventListener('click', checkOrder);
