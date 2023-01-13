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

//Открывание popup окон
function openPopup() {
  popupEdit.classList.toggle('popup_opened');
  popupInvisible.classList.remove('popup_invisible');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popupEdit.classList.toggle('popup_opened');
  popupInvisible.classList.add('popup_invisible');
}

function openPopupAdd() {
  popupAdd.classList.toggle('popup_add');
  popupAdd.classList.remove('popup_invisible');
}

function closePopupAdd() {
  popupAdd.classList.toggle('popup_add');
  popupAdd.classList.add('popup_invisible');
}

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

function addCard(evt) {
  evt.preventDefault();
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const addNameInput = document.querySelector('#add-name');
  const addImgInput = document.querySelector('#add-img');

  element.querySelector('.element__image').src = addImgInput.value;
  element.querySelector('.element__title').textContent = addNameInput.value;

  popupAdd.classList.add('popup_invisible');
  elementContainer.prepend(element);
  element.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
};

buttonAddCard.addEventListener('click', addCard);


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
    name: 'Pepega',
    link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuWwMh0zGJ1mHpSrfeZHjSmyXilaDu1kjTNw&usqp=CAU'
  },
  {
    name: 'Booba',
    link: 'https://media.tenor.com/JA54ZFxi1c0AAAAC/booba-twitch.gif'
  }
];

initialCards.forEach(function (item) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__title').textContent = item.name;

  elementContainer.prepend(element);
});