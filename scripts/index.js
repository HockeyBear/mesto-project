const buttonOpenEdit = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__button');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const buttonCloseAdd = document.querySelector('#popup-add-close');
const buttonAddCard = document.getElementById('popup-add-card');
const popupCloseEdit = document.querySelector('#popup-edit-close');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElementEdit = document.querySelector('#edit-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const elementContainer = document.querySelector('.elements');
const viewElement = document.querySelector('#popup-view');


//Открывание popup окон
function openClosePopupEdit() {
  popupEdit.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openClosePopupAdd() {
  popupAdd.classList.toggle('popup_add');
}

const closeView = document.querySelector('#popup-view-close');

function closeViewImage() {
  viewElement.classList.remove('popup_opened');
}
closeView.addEventListener('click', closeViewImage);

buttonOpenEdit.addEventListener('click', openClosePopupEdit);
popupCloseEdit.addEventListener('click', openClosePopupEdit);
buttonOpenAdd.addEventListener('click', openClosePopupAdd);
buttonCloseAdd.addEventListener('click', openClosePopupAdd);
//----------------------------------------------------------------

// Редактироване Имени и деятельности
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  openClosePopupEdit();
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

  popupAdd.classList.remove('popup_add');
  
  element.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  const delButton = document.querySelector('.element__trash');
  element.querySelector('.element__trash').addEventListener('click', function(evt) {
    const targetEl = evt.target;
    const targetItem = targetEl.closest('.element');
    targetItem.remove();
  });

  const viewImage = document.querySelector('.popup__image');
  const viewInfo = document.querySelector('.popup__info');
  element.querySelector('.element__open-image').addEventListener('click', function() {
    viewElement.classList.add('popup_opened');
    viewImage.src = link;
    viewImage.alt = name;
    viewInfo.textContent = name;
  });
  return element;
}

buttonAddCard.addEventListener('click', (evt) => {
  evt.preventDefault();
  elementContainer.prepend(addCard(addNameInput.value, addImgInput.value));
  addNameInput.value = "";
  addImgInput.value = "";
});

function initAddCard() {
  initialCards.forEach(item => elementContainer.prepend(addCard(item.name, item.link)));

};

initAddCard();