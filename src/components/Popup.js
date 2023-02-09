export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleTargetClose = this._handleTargetClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('click', this._handleTargetClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('click', this._handleTargetClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup
      .querySelector('.popup__close')
      .addEventListener('click', () => this.close());
  }

  _handleTargetClose(e) {
    if (e.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose(e) {
    if (e.code === 'Escape') {
      this.close();
    }
  }
}
