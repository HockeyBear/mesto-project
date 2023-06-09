import './index.css';
import { config, getUserInfo, getInitCard, postAddCard, editProfile, editAvatar } from '../components/api.js';
import { validConfig, enableValidation } from '../components/validation.js';
import { addCard } from '../components/card.js';
import {
  formAdd, formEdit, formSave, inputNameFormAddNewCard, addCardBtn, inputLinkFormAddNewCard, elementContainer, popupAdd, closePopup,
  buttonOpenEdit, popupCloseEdit, buttonOpenAdd, openProfilePopup, openCardPopup, buttonCloseAdd, closeView, viewElement, popupEdit,
  buttonOpenSave, popupSave, openAvatarPopup, popupCloseEditAvatar, handleOverlay, editProfileBtn, saveAvatarBtn, nameInput, jobInput,
  inputLinkFormSaveAvatar
} from '../components/modal.js';
import { renderProfile } from '../components/utils';

//----------------------------------------------------------------

Promise.all([
  getUserInfo(config),
  getInitCard(config)
])
  .then(([data, cards]) => {
    renderProfile(data);
    const initialCards = Array.from(cards.reverse());
    initialCards.forEach(element => {
      elementContainer.prepend(addCard(element));
    })
  })
  .catch((err) => {
    console.log(err);
  })

formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCardBtn.textContent = "Сохранение..."
  const element = {};
  element.name = inputNameFormAddNewCard.value;
  element.link = inputLinkFormAddNewCard.value;
  postAddCard(config, element)
    .then((res) => {
      elementContainer.prepend(addCard(res));
      closePopup(popupAdd);
      formAdd.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardBtn.textContent = "Создать";
    })
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

enableValidation(validConfig);

popupEdit.addEventListener('mousedown', handleOverlay);
popupAdd.addEventListener('mousedown', handleOverlay);
popupSave.addEventListener('mousedown', handleOverlay)
viewElement.addEventListener('mousedown', handleOverlay);

buttonOpenEdit.addEventListener('click', () => openProfilePopup());
popupCloseEdit.addEventListener('click', () => closePopup(popupEdit));
buttonOpenAdd.addEventListener('click', () => openCardPopup(validConfig));
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd));
closeView.addEventListener('click', () => closePopup(viewElement));
buttonOpenSave.addEventListener('click', ()=> openAvatarPopup(validConfig));
popupCloseEditAvatar.addEventListener('click', ()=> closePopup(popupSave));