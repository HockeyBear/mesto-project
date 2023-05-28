import { viewImage, viewInfo, openPopup, viewElement, elementContainer } from './modal.js'
import { initialCards } from './utils.js';

//Добавление карточки через массив, кнопку, Ивент лайка, просмотр карточки.
const elementTemplate = document.querySelector('#element-template').content;

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
  element.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('element__like')) {
      evt.target.classList.toggle('element__like_active');
    }
  });
  return element;
}

function initAddCard() {
  initialCards.forEach(item => elementContainer.prepend(addCard(item.name, item.link)));
}

export { addCard, initAddCard };