import { editProfile, config, editAvatar } from './api.js';
import { renderProfile } from './utils.js';
import { validConfig, toggleButtonState } from './validation.js'

//Имя, профессия и аватар на странице
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

//Форма и поля имени и профессии
const formEdit = document.querySelector('#edit-form');
const nameInput = formEdit.querySelector('[name="namee"]');
const jobInput = formEdit.querySelector('[name="job"]');

//Форма и поля создания карточки
const formAdd = document.querySelector('#add-form');
const inputNameFormAddNewCard = formAdd.querySelector('[name="addName"]');
const inputLinkFormAddNewCard = formAdd.querySelector('[name="addImg"]');

//Форма и поле сохранения картинки
const formSave = document.querySelector('#save-form');
const inputLinkFormSaveAvatar = formSave.querySelector('[name="saveAvatar"]');

//Елемент картинки
const viewElement = document.querySelector('#popup-view');
const viewImage = document.querySelector('.popup__image');
const viewInfo = document.querySelector('.popup__info');

//Елемент
const elementContainer = document.querySelector('.elements');

//Кнопки
const buttonOpenEdit = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__add-button');
const buttonOpenSave = document.querySelector('.profile__avatar-edit-button');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupSave = document.querySelector('#popup-save');
const addCardBtn = document.querySelector('.popup__button-add');
const editProfileBtn = document.querySelector('.popup__button-edit');
const saveAvatarBtn = document.querySelector('.popup__button-save-avatar');
const buttonCloseAdd = document.querySelector('#popup-add-close');
const popupCloseEdit = document.querySelector('#popup-edit-close');
const popupCloseEditAvatar = document.querySelector('#popup-save-close');
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

function saveAvatarOpen (validConfig) {
  openPopup(popupSave);
  const inputList = Array.from(popupSave.querySelectorAll(validConfig.inputSelector));
  const buttonElement = popupSave.querySelector(validConfig.submitButtonSelector);
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

popupSave.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target)
  }
})

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

formSave.addEventListener('submit', function(evt) {
  evt.preventDefault();
  saveAvatarBtn.textContent = "Сохранение...";
  editAvatar(config, inputLinkFormSaveAvatar)
  .then((res) => {
    renderProfile(res);
    closePopup(popupSave);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    saveAvatarBtn.textContent = "Сохранить";
  });
});

export {
  profileName, profileJob, formEdit, nameInput, jobInput, formAdd, viewElement, 
  keyHandler, viewImage, viewInfo, elementContainer, buttonOpenEdit,
  buttonOpenAdd, popupEdit, popupAdd, popupSave, addCardBtn, editProfileOpen, addCardOpen,
  buttonCloseAdd, popupCloseEdit, closeView, openPopup, closePopup, inputNameFormAddNewCard,
  inputLinkFormAddNewCard, formSave, inputLinkFormSaveAvatar, saveAvatarOpen, buttonOpenSave,
  popupCloseEditAvatar, saveAvatarBtn, profileAvatar };