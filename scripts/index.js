const buttonOpenEdit = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__button');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const formAdd = document.forms.add;
const addCardBtn = add.elements.addCardBtn;
const buttonCloseAdd = document.querySelector('#popup-add-close');
const popupCloseEdit = document.querySelector('#popup-edit-close');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formEdit = document.forms.edit;
const namee = formEdit.elements.name;
const job = formEdit.elements.job;
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
  namee.value = profileName.textContent;
  job.value = profileJob.textContent;
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

viewElement.addEventListener('click', function(evt) {
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
  const nameValue = namee.value;
  const jobValue = job.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  namee.value = '';
  job.value = '';
  closePopup(popupEdit);
});
//----------------------------------------------------------------


const elementTemplate = document.querySelector('#element-template').content;
const addName = formAdd.elements.addName;
const addImg = formAdd.elements.addImg;

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

formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elementContainer.prepend(addCard(addName.value, addImg.value));
  formAdd.reset();
  closePopup(popupAdd);
  toggleButtonState();
});

// formAdd.addEventListener('input', function (evt) {
//   const isValid = addName.value.length > 0 && addImg.value.length > 0;
//   toggleButtonState(inputList, buttonElement);
// })

function initAddCard() {
  initialCards.forEach(item => elementContainer.prepend(addCard(item.name, item.link)));

};

initAddCard();

//valid
const addElement = document.querySelector('#add_form');
const formInput = addElement.querySelector('.popup__input');

const showError = (addElement, formInput, errorMessage) => {
  const formAddError = addElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add('popup__input_type_error');
  formAddError.textContent = errorMessage;
  formAddError.classList.add('popup__input-error_active');
};

const hideError = (addElement, formInput) => {
  const formAddError = addElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove('popup__input_type_error');
  formAddError.classList.remove('popup__input-error_active');
  formAddError.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', function () {
       checkInputValidity(formElement, inputElement);
       toggleButtonState(inputList, buttonElement);
     });
  });
};
setEventListeners(addElement);



const enableValidation = () => {
  const formList = Array.from(document.querySelector('#add_form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.form(formElement.querySelectorAll('.popup__set'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
};