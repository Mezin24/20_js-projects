'use strict';

const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');
const filterEl = document.getElementById('filter');

let postLimit = 5;
let currentPage = 1;

showPosts();

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${postLimit}&_page=${currentPage}`
  );
  const data = res.json();

  return data;
}

async function showPosts() {
  const posts = await getPosts();

  const html = posts
    .map(
      (post) => `
    <div class="post">
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    </div>
  `
    )
    .join('');

  postContainer.insertAdjacentHTML('beforeend', html);
}

function filterPosts(e) {
  const { value } = e.target;
  const postsEls = document.querySelectorAll('.post');

  postsEls.forEach((item) => {
    const title = item.querySelector('.post-title').innerText.toLowerCase();
    const body = item.querySelector('.post-body').innerText.toLowerCase();

    if (
      title.includes(value.toLowerCase()) ||
      body.includes(value.toLowerCase())
    ) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

window.addEventListener('scroll', () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    loader.classList.add('show');

    setTimeout(() => {
      loader.classList.remove('show');
      setTimeout(() => {
        currentPage++;
        showPosts();
      }, 300);
    }, 1000);
  } else {
    loader.classList.remove('show');
  }
});

filterEl.addEventListener('input', filterPosts);
