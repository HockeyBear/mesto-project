import './index.css';
import { config, profileConfig, getInitCard, postAddCard } from '../components/api.js';
import { validConfig, enableValidation } from '../components/validation.js';
import { addCard, initAddCard } from '../components/card.js';
import { formAdd, inputNameFormAddNewCard, addCardBtn, inputLinkFormAddNewCard, elementContainer, popupAdd, closePopup,
buttonOpenEdit, popupCloseEdit, buttonOpenAdd, editProfileOpen, addCardOpen, buttonCloseAdd, closeView, viewElement, popupEdit } from '../components/modal.js';

//----------------------------------------------------------------


formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCardBtn.textContent = "Сохранение..."
  elementContainer.prepend(addCard(inputNameFormAddNewCard.value, inputLinkFormAddNewCard.value));
  const element = {};
  element.name = inputNameFormAddNewCard.value;
  element.link = inputLinkFormAddNewCard.value;
  postAddCard(config, element)
  .then((res) => {
    addCard(res);
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


enableValidation(validConfig);
initAddCard();

buttonOpenEdit.addEventListener('click', ()=> editProfileOpen());
popupCloseEdit.addEventListener('click', ()=> closePopup(popupEdit));
buttonOpenAdd.addEventListener('click', ()=> addCardOpen(validConfig));
buttonCloseAdd.addEventListener('click', ()=> closePopup(popupAdd));
closeView.addEventListener('click', ()=> closePopup(viewElement));