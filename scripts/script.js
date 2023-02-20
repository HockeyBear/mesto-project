const buttonOpen = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__button');
const popupEdit = document.querySelector('.popup');
const popupAdd = document.querySelector('#popup-add');
const buttonCloseAdd = document.querySelector('#popup-add-close');
const buttonAddCard = document.querySelector('#popup-add-card');
const popupInvisible = document.querySelector('.popup_invisible');
const popupClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const elementContainer = document.querySelector('.elements');
const viewElement = document.querySelector('#popup-view');

const initialCards = [
  {
    name: 'Аэродинамика коровы',
    link: 'https://cs8.pikabu.ru/post_img/big/2017/02/06/5/1486362502294461247.jpg'
  },
  {
    name: 'Сердитый',
    link: 'https://otvet.imgsmail.ru/download/215206472_a52b7a855d5c8be485d6a85e3452e551.jpg'
  },
  {
    name: 'RTX off',
    link: './image/meme_rtxoff.PNG'
  },
  {
    name: 'RTX on',
    link: './image/meme_rtxon.PNG'
  },
  {
    name: 'Peepo',
    link: 'https://yt3.googleusercontent.com/DooRQ8zkfghQlFomvF0H0x22YsPtnAex6i4R54-0G_d21tS2spkFFHxCvX96jpwnLowJS-rtbA=s900-c-k-c0x00ffffff-no-rj'
  },
  {
    name: 'Booba',
    link: 'https://media.tenor.com/JA54ZFxi1c0AAAAC/booba-twitch.gif'
  }
];

//Открывание popup окон
function openPopup() {
  popupEdit.classList.add('popup_opened');
  popupInvisible.classList.remove('popup_invisible');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popupEdit.classList.remove('popup_opened');
  popupInvisible.classList.add('popup_invisible');
}

function openPopupAdd() {
  popupAdd.classList.add('popup_add');
  popupAdd.classList.remove('popup_invisible');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_add');
  popupAdd.classList.add('popup_invisible');
}

const closeView = document.querySelector('#popup-view-close');

function closeViewImage() {
  viewElement.classList.remove('popup_opened');
  viewElement.classList.add('popup_invisible');
}
closeView.addEventListener('click', closeViewImage);

buttonOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
buttonOpenAdd.addEventListener('click', openPopupAdd);
buttonCloseAdd.addEventListener('click', closePopupAdd);
//----------------------------------------------------------------

// Редактироване Имени и деятельности
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
//----------------------------------------------------------------


const elementTemplate = document.querySelector('#element-template').content;
const addNameInput = document.querySelector('#add-name');
const addImgInput = document.querySelector('#add-img');

//Добавление карточки через массив, кнопку, Ивент лайка, просмотр карточки.
function addCard(name, link) {

  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const templateImg = element.querySelector('.element__image')
  const templateTitle = element.querySelector('.element__title')
  templateImg.src = link;
  templateTitle.textContent = name;

  popupAdd.classList.add('popup_invisible');
  popupAdd.classList.remove('popup_add');
  elementContainer.prepend(element);
  
  element.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  const delButton = document.querySelector('.element__trash');
  element.querySelector('.element__trash').addEventListener('click', function() {
    const delCard = delButton.closest('.element');
    delCard.remove();
  });

  const viewImage = document.querySelector('.popup__image_view-image');
  const viewInfo = document.querySelector('.popup__image_view-info');
  element.querySelector('.element__open-image').addEventListener('click', function() {
    viewElement.classList.add('popup_opened');
    viewElement.classList.remove('popup_invisible');
    viewImage.src = link;
    viewInfo.textContent = name;
  });
  return element;
}

buttonAddCard.addEventListener('click', (evt) => {
  evt.preventDefault()
  addCard(addNameInput.value, addImgInput.value)
});

function initAddCard() {
  initialCards.forEach(item => elementContainer.prepend(addCard(item.name, item.link)));

};

initAddCard();