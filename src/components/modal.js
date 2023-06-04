import { editProfile, config } from './api.js';
import { renderProfile } from './utils.js';
import { validConfig, toggleButtonState } from './validation.js'

//Имя и профессия на странице
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Форма и поля имени и профессии
const formEdit = document.querySelector('#edit-form');
const nameInput = formEdit.querySelector('[name="namee"]');
const jobInput = formEdit.querySelector('[name="job"]');

//Форма и поля создания карточки
const formAdd = document.querySelector('#add-form');
const inputNameFormAddNewCard = formAdd.querySelector('[name="addName"]');
const inputLinkFormAddNewCard = formAdd.querySelector('[name="addImg"]');

//Елемент картинки
const viewElement = document.querySelector('#popup-view');
const viewImage = document.querySelector('.popup__image');
const viewInfo = document.querySelector('.popup__info');

//Елемент
const elementContainer = document.querySelector('.elements');

//Кнопки
const buttonOpenEdit = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const addCardBtn = document.querySelector('.popup__button-add');
const editProfileBtn = document.querySelector('.popup__button-edit');
const buttonCloseAdd = document.querySelector('#popup-add-close');
const popupCloseEdit = document.querySelector('#popup-edit-close');
const closeView = document.querySelector('#popup-view-close');

//Открывание popup окон / Закрывание popup окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

const keyHandler = (evt) => {
  if(evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

function editProfileOpen () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
};

function addCardOpen (validConfig) {
  openPopup(popupAdd);
  const inputList = Array.from(popupAdd.querySelectorAll(validConfig.inputSelector));
  const buttonElement = popupAdd.querySelector(validConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validConfig);
}

popupEdit.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target)
  }
});

popupAdd.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target)
  }
});

viewElement.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target)
  }
});

// Редактироване Имени и деятельности
formEdit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  editProfileBtn.textContent = "Сохранение...";
  editProfile(config, nameInput, jobInput)
  .then((res) => {
    renderProfile(res);
    closePopup(popupEdit);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editProfileBtn.textContent = "Сохранить";
  });
});

export {
  profileName, profileJob, formEdit, nameInput, jobInput, formAdd, viewElement, 
  keyHandler, viewImage, viewInfo, elementContainer, buttonOpenEdit,
  buttonOpenAdd, popupEdit, popupAdd, addCardBtn, editProfileOpen, addCardOpen,
  buttonCloseAdd, popupCloseEdit, closeView, openPopup, closePopup, inputNameFormAddNewCard, inputLinkFormAddNewCard };