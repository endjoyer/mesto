const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('mousemove', () => {
      //   Иначе возникает ошибка Uncaught TypeError: Cannot read properties of null (reading 'classList')
      // at toggleButtonState (validate.js:35:19). Подругому ее решить я не в силах (
      setEventListeners(formElement, config);
    });
  });
}
//Без нее при закрытии попапов, без сохранения, остаются ошибки валидации
// function removeValidationErrors() {
//   nameImgInput.classList.remove('popup__input_type_error');
//   linkInput.classList.remove('popup__input_type_error');
//   formElement
//     .querySelector('.name-img-error')
//     .classList.remove('popup__input-error_active');
//   formElement
//     .querySelector('.link-error')
//     .classList.remove('popup__input-error_active');
// }

// function removeValidationErrors(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   const inputList = Array.from(document.querySelectorAll(config.inputSelector));

//   formList.forEach((formElement) => {
//     formElement.addEventListener('mousemove', () => {
//       inputList.forEach((formElement, inputElement) => {
//         const errorElement = formElement.querySelector(
//           `.${inputElement.name}-error`
//         );

//         errorElement.classList.remove(config.errorClass);
//         errorElement.textContent = '';
//         inputElement.classList.remove(config.inputErrorClass);
//       });
//     });
//   });
// }
