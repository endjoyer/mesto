import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._pictureFull = this._popup.querySelector('.popup-look-img__image');
    this._titlePicture = this._popup.querySelector('.popup-look-img__title');
  }
  open(item) {
    this._pictureFull.src = item.link;
    this._pictureFull.alt = item.name;
    this._titlePicture.textContent = item.name;
    super.open();
  }
}
