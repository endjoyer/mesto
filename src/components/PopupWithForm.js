import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleSubmitForm) {
    super(popupElement);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__container');
    this._submitText = this._popup.querySelector('.popup__btn-text');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name].textContent;
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitText.classList.add('popup__btn-text_loading');
    } else {
      this._submitText.classList.remove('popup__btn-text_loading');
    }
  }
}
