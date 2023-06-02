import { config, putLike, delLike } from './api.js';
import { viewImage, viewInfo, openPopup, viewElement, elementContainer } from './modal.js'
import { initialCards, renderProfile, userId } from './utils.js';

//Добавление карточки через массив, кнопку, Ивент лайка, просмотр карточки.
const elementTemplate = document.querySelector('#element-template').content;

function addPutLikeToDOM(likes, likeEvt, likeButton) {
  likeButton.classList.add('element__like_active');
  likes.textContent = likeEvt.likes.length;
}
function removePutLikeToDOM(likes, likeEvt, likeButton) {
  likeButton.classList.remove('element__like_active');
  likes.textContent = likeEvt.likes.length;
}

function addCard(obj) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const templateImg = element.querySelector('.element__image');
  const templateTitle = element.querySelector('.element__title');
  const likes = element.querySelector('.element__quantity-likes');
  templateImg.src = obj;
  templateImg.alt = obj;
  templateTitle.textContent = obj;
  likes.textContent = obj.likes.length;
  const likeButton = document.querySelector('.element__like');
  if(obj.likes.some(object => object._id == userId)) {
    likeButton.classList.add("element__like_active");
  }
  element.addEventListener('click', function() {
    if(element.target.classList.contains('element__like')) {
      // evt.target.classList.toggle('element__like_active');
      putLike(likeEvt, config)
      .then((res) => {
        addPutLikeToDOM(likes, res, likeButton)
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      delLike(likeEvt, config)
      .then((res) => {
        removePutLikeToDOM(likes, res, likeButton)
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
    viewImage.src = link;
    viewImage.alt = name;
    viewInfo.textContent = name;
  });
  return element;
}

function initAddCard() {
  initialCards.forEach(item => elementContainer.prepend(addCard(item.name, item.link)));
}

export { addCard, initAddCard };