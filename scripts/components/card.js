import { initialCards } from '../utils/initialCards.js';
import { openPopup, closePopup } from '../utils/openAndClosePopup.js';

export const popupCard = document.querySelector('#popup-add');
const popupCardOpenButtons = document.querySelector('.profile__add-batton');
const closePopupButtonCard = popupCard.querySelector('.popup__close');
const addElementForm = popupCard.querySelector('.popup__container');
const elementsContainer = document.querySelector('.elements__container');
const nameImgInput = addElementForm.querySelector("input[name='name-img']");
const linkInput = addElementForm.querySelector("input[name='link']");
const popupLookImg = document.querySelector('.popup-look-img');
const popupLookImgTitle = document.querySelector('.popup-look-img__title');
const popupLookImgClose = popupLookImg.querySelector('.popup__close');
const pictureFull = document.querySelector('.popup-look-img__image');

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
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
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    popupCardOpenButtons.addEventListener('click', () => {
      openPopup(popupCard);
    });

    closePopupButtonCard.addEventListener('click', () => {
      closePopup(popupCard);
    });

    popupLookImgClose.addEventListener('click', () => {
      closePopup(popupLookImg);
    });
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._handleOpenPopupLookImg();
      });
    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });
    this._element
      .querySelector('.element__like')
      .addEventListener('click', (e) => {
        this._handleLikeCard(e);
      });
  }

  _handleOpenPopupLookImg() {
    pictureFull.src = this._link;
    openPopup(popupLookImg);
    pictureFull.alt = this._name;
    popupLookImgTitle.textContent = this._name;
  }

  _handleDeleteCard() {
    this._element.remove();
  }
  _handleLikeCard(e) {
    e.target.classList.toggle('element__like_active');
  }
}

export const renderCards = () => {
  initialCards.forEach((item) => {
    const cards = new Card(item.name, item.link, '#element-template');
    const cardElement = cards.generateCard();

    elementsContainer.append(cardElement);
  });

  const addCard = (e) => {
    e.preventDefault();
    const name = nameImgInput.value;
    const link = linkInput.value;
    const card = new Card(name, link, '#element-template');
    const cardElement = card.generateCard();
    nameImgInput.value = '';
    linkInput.value = '';
    elementsContainer.prepend(cardElement);
    closePopup(popupCard);
  };

  addElementForm.addEventListener('submit', addCard);
};
