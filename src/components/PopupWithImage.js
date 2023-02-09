import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pictureFull = document.querySelector('.popup-look-img__image');
  }
  open(item) {
    // this._activePopup = this._popup;
    this._pictureFull.src = item.link;
    this._pictureFull.alt = item.name;
    document.querySelector('.popup-look-img__title').textContent = item.name;
    super.open();
    // this._popup.classList.add('popup_opened');
    // document.addEventListener('click', this._handleTargetClose);
    // document.addEventListener('keydown', this._handleEscClose);
  }
}
