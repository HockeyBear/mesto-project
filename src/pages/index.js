import './index.css';
import { config, profileConfig, getInitCard, postAddCard } from '../components/api.js';
import { validConfig, enableValidation } from '../components/validation.js';
import { addCard } from '../components/card.js';
import {
  formAdd, inputNameFormAddNewCard, addCardBtn, inputLinkFormAddNewCard, elementContainer, popupAdd, closePopup,
  buttonOpenEdit, popupCloseEdit, buttonOpenAdd, editProfileOpen, addCardOpen, buttonCloseAdd, closeView, viewElement, popupEdit
} from '../components/modal.js';
import { renderProfile } from '../components/utils';

//----------------------------------------------------------------

Promise.all([
  profileConfig(config),
  getInitCard(config)
])
  .then(([data, cards]) => {
    renderProfile(data);
    let initialCards = Array.from(cards.reverse());
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

enableValidation(validConfig);

buttonOpenEdit.addEventListener('click', () => editProfileOpen());
popupCloseEdit.addEventListener('click', () => closePopup(popupEdit));
buttonOpenAdd.addEventListener('click', () => addCardOpen(validConfig));
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd));
closeView.addEventListener('click', () => closePopup(viewElement));