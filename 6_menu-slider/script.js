const toggleBtn = document.getElementById('toggle');
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const modal = document.getElementById('modal');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('open-nav');
});

openBtn.addEventListener('click', () => {
  modal.classList.add('visible');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('visible');
});

window.addEventListener('click', (e) =>
  e.target === modal ? modal.classList.remove('visible') : false
);
