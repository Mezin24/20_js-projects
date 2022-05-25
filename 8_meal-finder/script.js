const form = document.getElementById('submit');
const mealsEl = document.getElementById('meals');
const searchEl = document.getElementById('search');
const singleMealEl = document.getElementById('single-meal');
const resultHeading = document.getElementById('result-heading');
const randomBtn = document.getElementById('random');

const urlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const urlRandomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php';

async function getMeal(url, endpoind = '') {
  const res = await fetch(url + endpoind);
  const data = await res.json();
  return data;
}

function searchMeal(e) {
  e.preventDefault();

  resultHeading.innerHTML = '';
  mealsEl.innerHTML = '';
  singleMealEl.innerHTML = '';

  const term = searchEl.value;

  if (term.trim()) {
    getMeal(urlName, term).then((data) => {
      console.log(data);
      resultHeading.innerHTML = `<h2>Search result for "${term}"</h2>`;
      if (data.meals === null) {
        resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
      } else {
        mealsEl.innerHTML = data.meals
          .map(
            (meal) => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info"  data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        `
          )
          .join('');
      }
    });
    searchEl.value = '';
  } else {
    alert('Please enter a search term');
  }
}

function addMealToDOM(meal) {
  const ingridients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingridients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img  src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingridients</h2>
        <ul>
          ${ingridients.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

form.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  const mealId = mealInfo.dataset.mealid;
  if (!mealId) {
    return;
  }

  getMeal(urlID, mealId).then((data) => {
    addMealToDOM(data.meals[0]);
  });
});

randomBtn.addEventListener('click', () => {
  getMeal(urlRandomMeal).then((data) => {
    resultHeading.innerHTML = '';
    mealsEl.innerHTML = '';
    addMealToDOM(data.meals[0]);
  });
});
