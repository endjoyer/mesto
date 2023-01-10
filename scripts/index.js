//------------------------------Popup_profile------------------------------

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('#popup-edit');
const popupEditContainer = popupEditProfile.querySelector('.popup__container');
const openPopupEditButtons = document.querySelector('.profile__edit-batton');
const closePopupEditButton = popupEditProfile.querySelector('.popup__close');
const nameInput = document.querySelector("input[name='name']");
const jobInput = document.querySelector("input[name='about-me']");
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

let activePopup = null;

function openPopup(popup) {
  activePopup = popup;
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupByTarget);
  document.addEventListener('keydown', сlosePopupByEscape);
}

function closePopup() {
  activePopup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupByTarget);
  document.removeEventListener('keydown', сlosePopupByEscape);
}
function closePopupByTarget(e) {
  if (e.target.classList.contains('popup')) {
    closePopup(e.target);
  }
}

function сlosePopupByEscape(e) {
  if (e.code === 'Escape') {
    closePopup(activePopup);
  }
}

openPopupEditButtons.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

closePopupEditButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popup);
}

popupEditContainer.addEventListener('submit', handleFormEditSubmit);

//------------------------------Popup_card------------------------------
//------------------------------Open_popup------------------------------

const popupCard = document.querySelector('#popup-add');
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

//------------------------------Adding_cards------------------------------
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

const renderCards = () => {
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

renderCards();

// const renderCard = ({ name, link }) => {
//   elementsContainer.prepend(createCard({ name, link }));
// };

// const addElement = (e) => {
//   e.preventDefault();
//   const name = nameImgInput.value;
//   const link = linkInput.value;
//   nameImgInput.value = '';
//   linkInput.value = '';
//   renderCard({ name, link });
//   closePopup(popupCard);
// };

// addElementForm.addEventListener('submit', addElement);

// const createCard = ({ name, link }) => {
//   const element = document
//     .querySelector('#element-template')
//     .content.querySelector('.element')
//     .cloneNode(true);
//   const elementImage = element.querySelector('.element__image');
//   const elementName = element.querySelector('.element__name');
//   elementName.textContent = name;
//   elementImage.src = link;
//   elementImage.alt = name;
//   elementImage.addEventListener('click', () => {
//     pictureFull.src = elementImage.src;
//     openPopup(popupLookImg);
//     pictureFull.alt = elementImage.alt;
//     popupLookImgTitle.textContent = pictureFull.alt;
//   });
//   element.querySelector('.element__delete').addEventListener('click', () => {
//     element.remove();
//   });
// element.querySelector('.element__like').addEventListener('click', (e) => {
//   e.target.classList.toggle('element__like_active');
// });

//   return element;
// };

// const renderCard = ({ name, link }) => {
//   elementsContainer.prepend(createCard({ name, link }));
// };

// elementsContainer.append(...initialCards.map(createCard));

// const addElement = (e) => {
//   e.preventDefault();
//   const name = nameImgInput.value;
//   const link = linkInput.value;
//   nameImgInput.value = '';
//   linkInput.value = '';
//   renderCard({ name, link });
//   closePopup(popupCard);
// };

// addElementForm.addEventListener('submit', addElement);

// enableValidation(validationConfig);
