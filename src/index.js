import '../pages//index.css';
import { openPopup, closePopup } from '../scripts/utils/openAndClosePopup.js';
import { initialCards } from '../scripts/utils/initialCards.js';
import Card from '../scripts/components/card.js';
import { validationConfig } from '../scripts/utils/validationConfig.js';
import FormValidator from '../scripts/components/formValidator.js';

//------------------------------Popup_profile------------------------------

const popupEditProfile = document.querySelector('#popup-edit');
const popupEditContainer = popupEditProfile.querySelector('.popup__container');
const openPopupEditButtons = document.querySelector('.profile__edit-batton');
const closePopupEditButton = popupEditProfile.querySelector('.popup__close');
const nameInput = document.querySelector("input[name='name']");
const jobInput = document.querySelector("input[name='about-me']");
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

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
  closePopup(popupEditProfile);
}

popupEditContainer.addEventListener('submit', handleFormEditSubmit);

//------------------------------Popup_cards------------------------------
const popupCard = document.querySelector('#popup-add');
const popupCardOpenButtons = document.querySelector('.profile__add-batton');
const closePopupButtonCard = popupCard.querySelector('.popup__close');

const popupLookImg = document.querySelector('.popup-look-img');
const popupLookImgTitle = document.querySelector('.popup-look-img__title');
const popupLookImgClose = popupLookImg.querySelector('.popup__close');
const pictureFull = document.querySelector('.popup-look-img__image');
const elementsContainer = document.querySelector('.elements__container');
const addElementForm = popupCard.querySelector('.popup__container');
const nameImgInput = addElementForm.querySelector("input[name='name-img']");
const linkInput = addElementForm.querySelector("input[name='link']");

popupCardOpenButtons.addEventListener('click', () => {
  openPopup(popupCard);
});

closePopupButtonCard.addEventListener('click', () => {
  closePopup(popupCard);
});

popupLookImgClose.addEventListener('click', () => {
  closePopup(popupLookImg);
});

function handleOpenPopupLookImg(name, link) {
  pictureFull.src = link;
  pictureFull.alt = name;
  popupLookImgTitle.textContent = name;
  openPopup(popupLookImg);
}

const createCard = ({ name, link }) => {
  const card = new Card(
    name,
    link,
    '#element-template',
    handleOpenPopupLookImg
  ).generateCard();
  return card;
};

initialCards.forEach((name, link) => {
  createCard(name, link);
  elementsContainer.append(createCard(name, link));
});

const addCard = (e) => {
  e.preventDefault();
  const name = nameImgInput.value;
  const link = linkInput.value;
  elementsContainer.prepend(createCard({ name, link }));
  nameImgInput.value = '';
  linkInput.value = '';
  popupCardValidator.toggleButtonState();
  closePopup(popupCard);
};

addElementForm.addEventListener('submit', addCard);

//------------------------------Validation_forms------------------------------

const popupEditProfileValidator = new FormValidator(
  validationConfig,
  popupEditProfile
);
popupEditProfileValidator.enableValidation();

const popupCardValidator = new FormValidator(validationConfig, popupCard);
popupCardValidator.enableValidation();
