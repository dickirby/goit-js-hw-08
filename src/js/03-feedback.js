import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const items = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};
const dataForm = {};
items.form.addEventListener('submit', onFormSubmit);
items.textarea.addEventListener('input', throttle(onTextAreaInput, 500));
items.input.addEventListener('input', throttle(onInput, 500));

onReload();

function onTextAreaInput(evt) {
  const message = evt.currentTarget.value;
  dataForm.message = message;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
}

function onInput(evt) {
  const email = evt.currentTarget.value;
  dataForm.email = email;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
}

function onReload() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parseData = JSON.parse(savedData);
  if (savedData) {
    items.input.value = parseData.email;
    items.textarea.value = parseData.message;
  }
}
function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(dataForm);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
