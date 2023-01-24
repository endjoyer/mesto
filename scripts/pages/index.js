import { renderCards, popupCard } from '../components/card.js';
import { openPopup, closePopup } from '../utils/openAndClosePopup.js';
import { validationConfig } from '../utils/validationConfig.js';
import { FormValidator } from '../components/formValidator.js';

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

renderCards();

//------------------------------Validation_forms------------------------------

const popupEditProfileValidator = new FormValidator(
  validationConfig,
  popupEditProfile
);
popupEditProfileValidator.enableValidation();

const popupCardValidator = new FormValidator(validationConfig, popupCard);
popupCardValidator.enableValidation();
