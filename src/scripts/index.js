import { initialCards } from './cards.js';
import { profileName, profileJob, formEdit, nameInput, jobInput, formAdd, addName, addImg, viewElement, viewImage, viewInfo, elementContainer, buttonOpenEdit, buttonOpenAdd, popupEdit, popupAdd, buttonCloseAdd, popupCloseEdit, closeView, openPopup, closePopup } from './modal.js';

//Закрывание popup окон
buttonOpenEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

popupEdit.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    evt.target.classList.toggle('popup_opened');
  }
});

popupAdd.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    evt.target.classList.toggle('popup_opened');
  }
});

viewElement.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    evt.target.classList.toggle('popup_opened');
  }
});

popupCloseEdit.addEventListener('click', ()=> closePopup(popupEdit));
buttonOpenAdd.addEventListener('click', ()=> openPopup(popupAdd));
buttonCloseAdd.addEventListener('click', ()=> closePopup(popupAdd));
closeView.addEventListener('click', ()=> closePopup(viewElement));
//----------------------------------------------------------------

// Редактироване Имени и деятельности
formEdit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  nameInput.value = '';
  jobInput.value = '';
  closePopup(popupEdit);
});
//----------------------------------------------------------------


const elementTemplate = document.querySelector('#element-template').content;

//Добавление карточки через массив, кнопку, Ивент лайка, просмотр карточки.
function addCard(name, link) {

  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const templateImg = element.querySelector('.element__image');
  const templateTitle = element.querySelector('.element__title');
  templateImg.src = link;
  templateImg.alt = name;
  templateTitle.textContent = name;

  element.querySelector('.element__trash').addEventListener('click', function(evt) {
    const targetEl = evt.target;
    const targetItem = targetEl.closest('.element');
    targetItem.remove();
  });

  element.querySelector('.element__open-image').addEventListener('click', function() {
    openPopup(viewElement);
    viewImage.src = link;
    viewImage.alt = name;
    viewInfo.textContent = name;
  });
  return element;
}

elementContainer.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  }
})

formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elementContainer.prepend(addCard(addName.value, addImg.value));
  formAdd.reset();
  closePopup(popupAdd);
});

function initAddCard() {
  initialCards.forEach(item => elementContainer.prepend(addCard(item.name, item.link)));

};

initAddCard();

//valid
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

const enableValidation = () => {
  const inputList = Array.from(document.querySelectorAll('.popup__form'));
  inputList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    })
  })
}
enableValidation();

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  }else{
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
}