
//Имя и профессия на странице
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Форма и поля имени и профессии
const formEdit = document.querySelector('#edit-form');
const nameInput = formEdit.querySelector('[name="namee"]');
const jobInput = formEdit.querySelector('[name="job"]');

//Форма и поля создания карточки
const formAdd = document.querySelector('#add-form');
const addName = formAdd.querySelector('[name="addName"]');
const addImg = formAdd.querySelector('[name="addImg"]');

//Елемент картинки
const viewElement = document.querySelector('#popup-view');
const viewImage = document.querySelector('.popup__image');
const viewInfo = document.querySelector('.popup__info');

//Елемент
const elementContainer = document.querySelector('.elements');

//Кнопки
const buttonOpenEdit = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__button');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const addCardBtn = add.elements.addCardBtn;
const buttonCloseAdd = document.querySelector('#popup-add-close');
const popupCloseEdit = document.querySelector('#popup-edit-close');
const closeView = document.querySelector('#popup-view-close');

//Открывание popup окон / Закрывание popup окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
  addCardBtn.classList.add('popup__button_disabled')
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

const keyHandler = (evt) => {
  if(evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

buttonOpenEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

popupEdit.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    evt.target.classList.toggle('popup_opened');
  }
});

popupAdd.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    evt.target.classList.toggle('popup_opened');
  }
});

viewElement.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('popup')) {
    evt.target.classList.toggle('popup_opened');
  }
});

popupCloseEdit.addEventListener('click', ()=> closePopup(popupEdit));
buttonOpenAdd.addEventListener('click', ()=> openPopup(popupAdd));
buttonCloseAdd.addEventListener('click', ()=> closePopup(popupAdd));
closeView.addEventListener('click', ()=> closePopup(viewElement));

// Редактироване Имени и деятельности
formEdit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  nameInput.value = '';
  jobInput.value = '';
  closePopup(popupEdit);
});

export {
  profileName,
  profileJob,
  formEdit, nameInput, jobInput, formAdd,
  addName, addImg, viewElement, keyHandler,
  viewImage, viewInfo, elementContainer, buttonOpenEdit,
  buttonOpenAdd, popupEdit, popupAdd, addCardBtn,
  buttonCloseAdd, popupCloseEdit, closeView, openPopup, closePopup };