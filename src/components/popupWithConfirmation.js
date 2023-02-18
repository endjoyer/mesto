import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._submitButton = this._popup.querySelector('.popup__btn');
  }

  submitCallback(remove) {
    this._handleSubmit = remove;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}
