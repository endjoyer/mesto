import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pictureFull = document.querySelector('.popup-look-img__image');
  }
  open(item) {
    this._pictureFull.src = item.link;
    this._pictureFull.alt = item.name;
    document.querySelector('.popup-look-img__title').textContent = item.name;
    super.open();
  }
}
