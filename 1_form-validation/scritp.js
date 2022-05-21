const formEl = document.getElementById('form');
const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const password2El = document.getElementById('password2');

function showError(el, msg) {
  const formControl = el.parentElement;
  formControl.classList.remove('success');
  formControl.classList.add('error');
  const msgEl = formControl.querySelector('small');
  msgEl.textContent = msg;
}

function showSuccess(el) {
  const formControl = el.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
}

const checkEmail = (input) => {
  const isValid = String(input.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (!isValid) {
    showError(input, 'Invalid email');
  } else {
    showSuccess(input);
  }
};

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    }
  });
}

function getFieldName(input) {
  return input.id[0].toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be maximum ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(password1, password2) {
  if (password1.value !== password2.value) {
    showError(password2, 'Password do not match');
  } else {
    showSuccess(password2);
  }
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  checkLength(usernameEl, 3, 15);
  checkLength(passwordEl, 6, 25);
  checkEmail(emailEl);
  checkPasswordMatch(passwordEl, password2El);
  checkRequired([usernameEl, emailEl, passwordEl, password2El]);
});
