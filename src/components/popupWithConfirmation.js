import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popup.querySelector('.popup__container');
  }

  submitCallback(remove) {
    this._handleSubmit = remove;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}
