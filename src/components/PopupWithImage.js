import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._pictureFull = this._popup.querySelector('.popup-look-img__image');
    this._titlePicture = this._popup.querySelector('.popup-look-img__title');
  }
  open(name, link) {
    this._pictureFull.src = link;
    this._pictureFull.alt = name;
    this._titlePicture.textContent = name;
    super.open();
  }
}
