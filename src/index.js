import './pages/index.css';
import { validConfig } from './components/validation.js';
import { initialCards } from './scripts/cards.js';
import { addCard } from './components/card.js';
import { formAdd, addName, addImg, elementContainer, popupAdd, closePopup } from './components/modal.js';

//----------------------------------------------------------------

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
} initAddCard();