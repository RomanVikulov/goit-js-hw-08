import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type="email"]'),
  textarea: document.querySelector('textarea'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

let formData = localStorage.getItem(LOCALSTORAGE_KEY)
  ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
  : {};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateForm();

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log('formData', formData);

  onResetForm();
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedForm = localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedForm) {
    for (const [key, value] of Object.entries(formData)) {
      refs.form[key].value = value;
    }
    console.log('populateForm ~ savedForm', savedForm);
  }
}

function onResetForm() {
  refs.form.reset();
  formData = {};
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
