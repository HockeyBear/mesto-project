import { viewImage, viewInfo, openPopup, viewElement } from './modal.js'

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
  return element;
}

export { addCard };