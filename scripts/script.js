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
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}

function openPopupAdd() {
  popupAdd.classList.add('popup_add');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_add');
}

const closeView = document.querySelector('#popup-view-close');

function closeViewImage() {
  viewElement.classList.remove('popup_opened');
}
closeView.addEventListener('click', closeViewImage);

buttonOpenEdit.addEventListener('click', openPopupEdit);
popupCloseEdit.addEventListener('click', closePopupEdit);
buttonOpenAdd.addEventListener('click', openPopupAdd);
buttonCloseAdd.addEventListener('click', closePopupAdd);
//----------------------------------------------------------------

// Редактироване Имени и деятельности
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopupEdit();
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

  const viewImage = document.querySelector('.popup__image_view-image');
  const viewInfo = document.querySelector('.popup__image_view-info');
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