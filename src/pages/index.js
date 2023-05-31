import './index.css';
import { config, profileConfig, getInitCard } from '../components/api.js';
import { validConfig, enableValidation } from '../components/validation.js';
import { addCard, initAddCard } from '../components/card.js';
import { formAdd, inputNameFormAddNewCard, inputLinkFormAddNewCard, elementContainer, popupAdd, closePopup,
buttonOpenEdit, popupCloseEdit, buttonOpenAdd, editProfileOpen, addCardOpen, buttonCloseAdd, closeView, viewElement, popupEdit } from '../components/modal.js';

//----------------------------------------------------------------



formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elementContainer.prepend(addCard(inputNameFormAddNewCard.value, inputLinkFormAddNewCard.value));
  formAdd.reset();
  closePopup(popupAdd);
});

enableValidation(validConfig);
initAddCard();

buttonOpenEdit.addEventListener('click', ()=> editProfileOpen());
popupCloseEdit.addEventListener('click', ()=> closePopup(popupEdit));
buttonOpenAdd.addEventListener('click', ()=> addCardOpen(validConfig));
buttonCloseAdd.addEventListener('click', ()=> closePopup(popupAdd));
closeView.addEventListener('click', ()=> closePopup(viewElement));