import { config, putLike, delLike, deleteCard } from './api.js';
import { viewImage, viewInfo, openPopup, viewElement, elementContainer } from './modal.js'
import { renderProfile, userId } from './utils.js';

//Добавление карточки через массив, кнопку, Ивент лайка, просмотр карточки.
const elementTemplate = document.querySelector('#element-template').content;

function addCard(card) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const templateImg = element.querySelector('.element__image');
  const templateTitle = element.querySelector('.element__title');
  const likeCount = element.querySelector('.element__quantity-likes');
  const likeButton = element.querySelector('.element__like');
  const trashButton = element.querySelector('.element__trash');
  templateImg.src = card.link;
  templateImg.alt = card.name;
  templateTitle.textContent = card.name;
  likeCount.textContent = card.likes.length;
  console.log(card.likes.length);
  console.log(userId);
  if(card.likes.some(like => like._id == userId)) {
    likeButton.classList.add("element__like_active");
  }
  likeButton.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('eЁlement__like_active')) {
      delLike(config, card)
      .then((res) => {
        likeButton.classList.remove('element__like_active');
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      putLike(config, card)
      .then((res) => {
        likeButton.classList.add('element__like_active');
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });
  if(card.owner._id !== userId) {
    trashButton.classList.add('element__trash-hidden');
  } else {
    trashButton.addEventListener('click', function() {
      const targetItem = trashButton.closest('.element');
      deleteCard(config, card)
      .then(() => {
        targetItem.remove();
      })
      .catch((err) => {
        console.log(err);
      })
    });
  }
  element.querySelector('.element__open-image').addEventListener('click', function() {
    openPopup(viewElement);
    viewImage.src = card.link;
    viewImage.alt = card.name;
    viewInfo.textContent = card.name;
  });
  return element;
}

export { addCard };