'use strict';

const rulesBtn = document.getElementById('rules-btn');
const closeRulesBtn = document.getElementById('close-btn');
const rulesEl = document.getElementById('rules');

rulesBtn.addEventListener('click', () => rulesEl.classList.add('show'));
closeRulesBtn.addEventListener('click', () => rulesEl.classList.remove('show'));
