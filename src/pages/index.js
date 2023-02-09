import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/initialCards.js';
import Card from '../components/card.js';
import { validationConfig } from '../utils/validationConfig.js';
import FormValidator from '../components/FormValidator.js';

const popupEditProfile = document.querySelector('#popup-edit');
const openPopupEditButtons = document.querySelector('.profile__edit-batton');
const popupCard = document.querySelector('#popup-add');
const popupCardOpenButtons = document.querySelector('.profile__add-batton');
const popupLookImg = document.querySelector('.popup-look-img');
const popupEditContainer = popupEditProfile.querySelector('.popup__container');
const editNameInput = popupEditContainer.elements.name;
const editJobInput = popupEditContainer.elements.job;

//создание класса попапа редактирования информации о пользователе
const popupWithFormEditProfile = new PopupWithForm(
  popupEditProfile,
  submitEditProfileForm
);

popupWithFormEditProfile.setEventListeners();

//создания класса переноса информации о пользователе
const userInfo = new UserInfo({
  title: '.profile__title',
  subtitle: '.profile__subtitle',
});

//создание класса попапа открытия картинки
const popupWithImage = new PopupWithImage(popupLookImg);

popupWithImage.setEventListeners();

//создание карточки с назавнием и ссылкой в попапе
const popupWithFormCard = new PopupWithForm(popupCard, (item) => {
  cardList.setItem(createCard(item));
  popupWithFormCard.close();
});

popupWithFormCard.setEventListeners();

//рендер карточек на страницу из массива
const cardList = new Section(
  {
    renderer: (item) => cardList.setItem(createCard(item)),
  },
  '.elements__container'
);

//отравка текста редактирования профиля на страницу
function submitEditProfileForm(value) {
  userInfo.setUserInfo(value.name, value.job);
  popupWithFormEditProfile.close();
}

//Создание новой карточки
const createCard = (item) => {
  return new Card(item, '#element-template', () =>
    popupWithImage.open(item)
  ).generateCard();
};

cardList.renderItems(initialCards.reverse());

//открытие попапа профиля
openPopupEditButtons.addEventListener('click', () => {
  const { title, subtitle } = userInfo.getUserInfo();
  editNameInput.value = title.textContent;
  editJobInput.value = subtitle.textContent;
  popupEditProfileValidator.toggleButtonState();
  popupWithFormEditProfile.open();
});

//открытие попапа создания карточки
popupCardOpenButtons.addEventListener('click', () => {
  popupCardValidator.toggleButtonState();
  popupWithFormCard.open();
});

//------------------------------Validation_forms------------------------------

//валидация формы профиля
const popupEditProfileValidator = new FormValidator(
  validationConfig,
  popupEditProfile
);
popupEditProfileValidator.enableValidation();

//валидация формы создания карточек
const popupCardValidator = new FormValidator(validationConfig, popupCard);
popupCardValidator.enableValidation();
