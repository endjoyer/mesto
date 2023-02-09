export default class Card {
  constructor(data, templateSelector, onClickImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._onClickImage = onClickImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._likeElement = this._element.querySelector('.element__like');

    this._elementImage.src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;
    this._elementImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._onClickImage(this._name, this._link);
      });
    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });
    this._element
      .querySelector('.element__like')
      .addEventListener('click', () => {
        this._handleLikeCard();
      });
  }

  _handleDeleteCard() {
    this._element.remove();
  }
  _handleLikeCard() {
    this._likeElement.classList.toggle('element__like_active');
  }
}
