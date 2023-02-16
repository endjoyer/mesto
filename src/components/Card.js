export default class Card {
  constructor({
    data,
    templateSelector,
    userId,
    onClickImage,
    onClickDeleteCard,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._cardId = data._id;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._onClickImage = onClickImage;
    this._onClickDeleteCard = onClickDeleteCard;
    // this._handleSetLike = handleSetLike;
    // this._handleRemoveLike = handleRemovelike;
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
    this._likeElement = this._element.querySelector('.element__like');
    this._deleteBatton = this._element.querySelector('.element__delete');
    this._elementImage.src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;
    this._elementImage.alt = this._name;
    // this._likesNumber = this._element.querySelector('.element__likes-number');
    this._handleDeleteCard();
    // this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._onClickImage(this._name, this._link);
      });

    this._deleteBatton.addEventListener('click', () => {
      this._onClickDeleteCard(this._cardId);
    });
    this._element
      .querySelector('.element__like')
      .addEventListener('click', () => {
        this._handleLikeCard();
      });
  }

  _handleDeleteCard() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBatton.remove();
    }
  }

  _handleLikeCard(data) {
    // this._likes = data.likes;
    // this._likesNumber.textContent = this._likes.length;
    this._likeElement.classList.toggle('element__like_active');
  }
}
