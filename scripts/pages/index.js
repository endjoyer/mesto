import { renderCards } from '../components/card.js';
import { openPopup, closePopup } from '../utils/openAndClosePopup.js';

//------------------------------Popup_profile------------------------------

const popupEditProfile = document.querySelector('#popup-edit');
const popupEditContainer = popupEditProfile.querySelector('.popup__container');
const openPopupEditButtons = document.querySelector('.profile__edit-batton');
const closePopupEditButton = popupEditProfile.querySelector('.popup__close');
const nameInput = document.querySelector("input[name='name']");
const jobInput = document.querySelector("input[name='about-me']");
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

openPopupEditButtons.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

closePopupEditButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popup);
}

popupEditContainer.addEventListener('submit', handleFormEditSubmit);

renderCards();

const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputElement = inputElement;
    this._inputList = inputList;
    this._buttonElement = buttonElement;
  }

  _showInputError() {
    const errorElement = this._formElement.querySelector(
      `.${this._inputElement.getAttribute('name')}-error`
    );

    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = this._inputElement.validationMessage;
    this._inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError() {
    const errorElement = this._formElement.querySelector(
      `.${this._inputElement.getAttribute('name')}-error`
    );

    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
    this._inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity() {
    if (this._inputElement.validity.valid) {
      this._hideInputError();
    } else {
      this._showInputError();
    }
  }

  _hasInvalidInput() {
    const inputElement = this._formElement.querySelector(
      this._config.inputSelector
    );
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    if (buttonElement !== null) {
      if (this._hasInvalidInput(this._inputList)) {
        buttonElement.classList.add(this._config.inactiveButtonClass);
      } else {
        buttonElement.classList.remove(this._config.inactiveButtonClass);
      }
    }
  }

  setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const inputElement = this._formElement.querySelector(
      this._config.inputSelector
    );

    this._toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }
}

function enableValidation(config) {
  const formValidator = new FormValidator(config, '.popup_opened');
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formValidator.setEventListeners(formElement);
  });
}

enableValidation(validationConfig);

// const showInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

//   errorElement.classList.add(config.errorClass);
//   errorElement.textContent = inputElement.validationMessage;
//   inputElement.classList.add(config.inputErrorClass);
// };

// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
//   inputElement.classList.remove(config.inputErrorClass);
// };

// const checkInputValidity = (formElement, inputElement, config) => {
//   if (inputElement.validity.valid) {
//     hideInputError(formElement, inputElement, config);
//   } else {
//     showInputError(formElement, inputElement, config);
//   }
// };

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// function toggleButtonState(inputList, buttonElement, config) {
//   if (buttonElement !== null) {
//     if (hasInvalidInput(inputList)) {
//       buttonElement.classList.add(config.inactiveButtonClass);
//     } else {
//       buttonElement.classList.remove(config.inactiveButtonClass);
//     }
//   }
// }

// const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(config.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);

//   toggleButtonState(inputList, buttonElement, config);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, config);
//       toggleButtonState(inputList, buttonElement, config);
//     });
//   });
// };

// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));

//   formList.forEach((formElement) => {
//     setEventListeners(formElement, config);
//   });
// }

// enableValidation(validationConfig);
