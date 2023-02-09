import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;

    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__container');
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  close() {
    // this._activePopup.classList.remove('popup_opened');
    // document.removeEventListener('click', this._handleTargetClose);
    // document.removeEventListener('keydown', this._handleEscClose);
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    // this._closeBatton.addEventListener('click', () => this.close());
  }
}
