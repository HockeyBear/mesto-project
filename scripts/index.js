const buttonOpenEdit = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__button');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const formAdd = document.querySelector('#add-form');
const addName = formAdd.querySelector('[name="addName"]');
const addImg = formAdd.querySelector('[name="addImg"]');
const addCardBtn = add.elements.addCardBtn;
const buttonCloseAdd = document.querySelector('#popup-add-close');
const popupCloseEdit = document.querySelector('#popup-edit-close');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formEdit = document.querySelector('#edit-form');
const nameInput = formEdit.querySelector('[name="namee"]');
const jobInput = formEdit.querySelector('[name="job"]');
const elementContainer = document.querySelector('.elements');
const viewElement = document.querySelector('#popup-view');
const viewImage = document.querySelector('.popup__image');
const viewInfo = document.querySelector('.popup__info');
const closeView = document.querySelector('#popup-view-close');



//Открывание popup окон
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
//----------------------------------------------------------------

// Редактироване Имени и деятельности
//function handleFormSubmitEdit(evt) {
//  evt.preventDefault();
//  const nameValue = nameInput.value;
//  const jobValue = jobInput.value;
//  profileName.textContent = nameValue;
//  profileJob.textContent = jobValue;
//  closePopup(popupEdit);
//}

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
//----------------------------------------------------------------


const elementTemplate = document.querySelector('#element-template').content;

//Добавление карточки через массив, кнопку, Ивент лайка, просмотр карточки.
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
    //viewElement.classList.add('popup_opened');
    openPopup(viewElement);
    viewImage.src = link;
    viewImage.alt = name;
    viewInfo.textContent = name;
  });
  return element;
}

elementContainer.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  }
})

formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elementContainer.prepend(addCard(addName.value, addImg.value));
  formAdd.reset();
  closePopup(popupAdd);
});

function initAddCard() {
  initialCards.forEach(item => elementContainer.prepend(addCard(item.name, item.link)));

};

initAddCard();

//valid
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

const enableValidation = () => {
  const inputList = Array.from(document.querySelectorAll('.popup__form'));
  inputList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    })
  })
}
enableValidation();

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  }else{
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
}