import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  const STORAGE_KEY = 'feedback-form-state';

  const saveFormState = throttle(function () {
    const state = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, 500);

  form.addEventListener('input', function () {
    saveFormState();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const currentState = {
      email: emailInput.value,
      message: messageInput.value,
    };
    console.log(currentState);

    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem(STORAGE_KEY);
  });

  const loadFormState = function () {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (storedState) {
      const { email, message } = JSON.parse(storedState);
      emailInput.value = email;
      messageInput.value = message;
    }
  };

  loadFormState();
});
