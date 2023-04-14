const buttonOpenEdit = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__button');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const buttonCloseAdd = document.querySelector('#popup-add-close');
const buttonAddCard = document.getElementById('add_form');
const popupCloseEdit = document.querySelector('#popup-edit-close');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElementEdit = document.querySelector('#edit-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const elementContainer = document.querySelector('.elements');
const viewElement = document.querySelector('#popup-view');
const viewImage = document.querySelector('.popup__image');
const viewInfo = document.querySelector('.popup__info');
const closeView = document.querySelector('#popup-view-close');


//Открывание popup окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonOpenEdit.addEventListener('click', ()=> {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

popupEdit.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('popup')) {
    evt.target.classList.toggle('popup_opened');
  }
});

popupAdd.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('popup')) {
    evt.target.classList.toggle('popup_opened');
  }
});

popupCloseEdit.addEventListener('click', ()=> closePopup(popupEdit));
buttonOpenAdd.addEventListener('click', ()=> openPopup(popupAdd));
buttonCloseAdd.addEventListener('click', ()=> closePopup(popupAdd));
closeView.addEventListener('click', ()=> closePopup(viewElement));
//----------------------------------------------------------------

// Редактироване Имени и деятельности
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
//----------------------------------------------------------------


const elementTemplate = document.querySelector('#element-template').content;
const addNameInput = document.querySelector('#add-name');
const addImgInput = document.querySelector('#add-img');

//Добавление карточки через массив, кнопку, Ивент лайка, просмотр карточки.
function addCard(name, link) {

  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const templateImg = element.querySelector('.element__image');
  const templateTitle = element.querySelector('.element__title');
  templateImg.src = link;
  templateImg.alt = name;
  templateTitle.textContent = name;

  element.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  element.querySelector('.element__trash').addEventListener('click', function(evt) {
    const targetEl = evt.target;
    const targetItem = targetEl.closest('.element');
    targetItem.remove();
  });

  element.querySelector('.element__open-image').addEventListener('click', function() {
    //viewElement.classList.add('popup_opened');
    openPopup(viewElement);
    viewImage.src = link;
    viewImage.alt = name;
    viewInfo.textContent = name;
  });
  return element;
}

buttonAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  elementContainer.prepend(addCard(addNameInput.value, addImgInput.value));
  addNameInput.value = "";
  addImgInput.value = "";
  closePopup(popupAdd);
});

function initAddCard() {
  initialCards.forEach(item => elementContainer.prepend(addCard(item.name, item.link)));

};

initAddCard();