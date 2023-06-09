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

//Элементы
const cardFormInputs = Array.from(popupAdd.querySelectorAll(validConfig.inputSelector));
const cardSubmitButton = popupAdd.querySelector(validConfig.submitButtonSelector);
const avatarFormInputs = Array.from(popupSave.querySelectorAll(validConfig.inputSelector));
const avatarSubmitButton = popupSave.querySelector(validConfig.submitButtonSelector);

//Открывание popup окон / Закрывание popup окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

const handleEscape = (evt) => {
  if(evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

function openProfilePopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
};

function openCardPopup (validConfig) {
  openPopup(popupAdd);
  toggleButtonState(cardFormInputs, cardSubmitButton, validConfig);
}

function openAvatarPopup (validConfig) {
  openPopup(popupSave);
  toggleButtonState(avatarFormInputs, avatarSubmitButton, validConfig);
}

function handleOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

export {
  profileName, profileJob, nameInput, jobInput, formAdd, formEdit, formSave, viewElement, 
  handleEscape, viewImage, viewInfo, elementContainer, buttonOpenEdit,
  buttonOpenAdd, popupEdit, popupAdd, popupSave, addCardBtn, openProfilePopup, openCardPopup,
  buttonCloseAdd, popupCloseEdit, closeView, openPopup, closePopup, inputNameFormAddNewCard,
  inputLinkFormAddNewCard, inputLinkFormSaveAvatar, openAvatarPopup, buttonOpenSave,
  popupCloseEditAvatar, saveAvatarBtn, profileAvatar, handleOverlay, editProfileBtn };