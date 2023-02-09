import './index.css';
// import { openPopup, closePopup } from '../utils/openAndClosePopup.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/initialCards.js';
import Card from '../components/card.js';
import { validationConfig } from '../utils/validationConfig.js';
import FormValidator from '../components/FormValidator.js';

//------------------------------Popup_profile------------------------------

const popupEditProfile = document.querySelector('#popup-edit');
const popupEditContainer = popupEditProfile.querySelector('.popup__container');
const openPopupEditButtons = document.querySelector('.profile__edit-batton');
const closePopupEditButton = popupEditProfile.querySelector('.popup__close');
// const nameInput = document.querySelector("input[name='name']");
// const jobInput = document.querySelector("input[name='about-me']");
const editNameInput = popupEditContainer.elements.name;
const editJobInput = popupEditContainer.elements.job;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
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

const popupWithFormEditProfile = new PopupWithForm(
  popupEditProfile,
  handleOpenPopupEditProfile
);

popupWithFormEditProfile.setEventListeners();

const userInfo = new UserInfo({
  name: '.profile__title',
  job: '.profile__subtitle',
});

const popupWithImage = new PopupWithImage(popupLookImg);

popupWithImage.setEventListeners();

const popupWithFormCard = new PopupWithForm(popupCard, (item) => {
  cardList.setItem(createCard(item));
  popupWithFormCard.close();
});

popupWithFormCard.setEventListeners();

const cardList = new Section(
  {
    renderer: (item) => cardList.setItem(createCard(item)),
  },
  '.elements__container'
);

// const cardList = new Section(
//   {
//     data: initialCards,
//     renderer: (item) => {
//       const card = createCard(item.name, item.link, '.elements__container');
//       cardList.setItem(card);
//     },
//   },
//   '.elements__container'
// );

//отравка текста редактирования профиля на страницу
function handleOpenPopupEditProfile(value) {
  userInfo.setUserInfo(value.name, value.job);
  popupWithFormEditProfile.close();
}

const createCard = (item) => {
  return new Card(item, '#element-template', () =>
    popupWithImage.open(item)
  ).generateCard();
};

cardList.renderItems(initialCards.reverse());

//открытие попапа профиля
openPopupEditButtons.addEventListener('click', () => {
  //Не могу понять почему в значение инутов передается undefined!!!
  // const { name, job } = userInfo.getUserInfo();
  // editNameInput.value = name;
  // editJobInput.value = job;
  popupWithFormEditProfile.open();
});

//открытие попапа создания карточки
popupCardOpenButtons.addEventListener('click', () => {
  popupWithFormCard.open();
});

//------------------------------Validation_forms------------------------------

const popupEditProfileValidator = new FormValidator(
  validationConfig,
  popupEditProfile
);
popupEditProfileValidator.enableValidation();

const popupCardValidator = new FormValidator(validationConfig, popupCard);
popupCardValidator.enableValidation();
