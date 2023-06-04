import { config, putLike, delLike } from './api.js';
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
  templateImg.src = card.link;
  templateImg.alt = card.name;
  templateTitle.textContent = card.name;
  likeCount.textContent = card.likes;
  console.log(card);
  if(card.likes && card.likes.length > 0 && card.likes.some(like => like._id == userId)) {
    likeButton.classList.add("element__like_active");
  }
  likeButton.addEventListener('click', function() {
    if(likeButton.target.classList.contains('element__like_active')) {
      // evt.target.classList.toggle('element__like_active');
      delLike(config)
      .then((res) => {
        // removePutLikeToDOM(likes, res, likeButton)
        likeButton.classList.remove('element__like_active');
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      putLike(config)
      .then((res) => {
        // addPutLikeToDOM(likes, res, likeButton)
        likeButton.classList.add('element__like_active');
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });
  element.querySelector('.element__trash').addEventListener('click', function(evt) {
    const targetEl = evt.target;
    const targetItem = targetEl.closest('.element');
    targetItem.remove();
  });
  element.querySelector('.element__open-image').addEventListener('click', function() {
    openPopup(viewElement);
    viewImage.src = card.link;
    viewImage.alt = card.name;
    viewInfo.textContent = card.name;
  });
  return element;
}

function initAddCard() {
  initialCards.forEach(item => elementContainer.prepend(addCard(item.name, item.link)));
}

export { addCard, initAddCard };