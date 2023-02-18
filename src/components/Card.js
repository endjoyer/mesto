export default class Card {
  constructor({
    data,
    templateSelector,
    userId,
    onClickImage,
    onClickDeleteCard,
    handlePutLike,
    handleRemoveLike,
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
    this._handlePutLike = handlePutLike;
    this._handleRemoveLike = handleRemoveLike;
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
    this._deleteButton = this._element.querySelector('.element__delete');
    this._elementImage.src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;
    this._elementImage.alt = this._name;
    this._likesNumber = this._element.querySelector('.element__number-likes');
    this._isLikeCard();
    this._hasDeleteCard();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._onClickImage(this._name, this._link);
    });

    this._deleteButton.addEventListener('click', () => {
      this._onClickDeleteCard(this._cardId);
    });
    this._likeElement.addEventListener('click', () => {
      if (this._element.querySelector('.element__like_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handlePutLike(this._cardId);
      }
    });
  }

  _hasDeleteCard() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove();
    }
  }

  _isLikeCard() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._likeElement.classList.add('element__like_active');
    }
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeElement.classList.toggle('element__like_active');
  }
}
