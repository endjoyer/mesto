import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import { validationConfig } from '../utils/validationConfig.js';
import FormValidator from '../components/FormValidator.js';

const popupEditProfile = document.querySelector('#popup-edit');
const openPopupEditButton = document.querySelector('.profile__edit-button');
const popupCard = document.querySelector('#popup-add');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupLookImg = document.querySelector('.popup-look-img');
const popupConfirmation = document.querySelector('#popup-confirmation');
const popupEditAvatar = document.querySelector('#popup-edit-avatar');
const openPopupEditAvatarButton = document.querySelector(
  '.profile__edit-avatar-button'
);
let userId;

//создание класса взаимодействия с api
const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-60/',
  headers: {
    authorization: '6a189007-b75f-4743-b5a0-635bc162974c',
    'Content-Type': 'application/json',
  },
});

//прием данных о профиле и карточках с сервера. И их использование
Promise.all([api.getInitialCards(), api.getInitialUser()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

//создания класса переноса информации о пользователе
const userInfo = new UserInfo({
  name: '.profile__title',
  about: '.profile__subtitle',
  avatar: '.profile__avatar',
});

//создание класса попапа редактирования информации о пользователе
const popupWithFormEditProfile = new PopupWithForm(
  popupEditProfile,
  submitEditProfileForm
);

popupWithFormEditProfile.setEventListeners();

//отправка текста редактирования профиля на страницу
function submitEditProfileForm(data) {
  popupWithFormEditProfile.renderLoading(true);
  api
    .editUser(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithFormEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithFormEditProfile.renderLoading(false);
    });
}

//создание класса попапа редактирования аватара
const popupWithFormEditAvatar = new PopupWithForm(
  popupEditAvatar,
  submitEditAvatarForm
);

popupWithFormEditAvatar.setEventListeners();

function submitEditAvatarForm(data) {
  popupWithFormEditAvatar.renderLoading(true);
  api
    .editUserAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithFormEditAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithFormEditAvatar.renderLoading(false);
    });
}

//создание класса попапа открытия картинки
const popupWithImage = new PopupWithImage(popupLookImg);

popupWithImage.setEventListeners();

//создание карточки с названием и ссылкой в попапе
const popupWithFormCard = new PopupWithForm(popupCard, submitCardForm);

popupWithFormCard.setEventListeners();

function submitCardForm(data) {
  popupWithFormCard.renderLoading(true);
  api
    .postCard(data)
    .then((res) => {
      cardsList.setItem(createCard(res));
      popupWithFormCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithFormCard.renderLoading(false);
    });
}

//создание класса попапа подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(popupConfirmation);

popupWithConfirmation.setEventListeners();

//рендер карточек на страницу из массива
const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.setItem(createCard(item));
    },
  },
  '.elements__container'
);

//Создание новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    templateSelector: '#element-template',
    userId: userId,
    onClickImage: (name, link) => popupWithImage.open(name, link),
    onClickDeleteCard: (cardId) => {
      popupWithConfirmation.open();
      popupWithConfirmation.submitCallback(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupWithConfirmation.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handlePutLike: (cardId) => {
      api
        .putLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api
        .removeLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });
  return card.generateCard();
};

//открытие попапа профиля
openPopupEditButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  popupWithFormEditProfile.setInputValues({
    name: data.name,
    about: data.about,
  });
  popupEditProfileValidator.resetValidation();
  popupWithFormEditProfile.open();
});

//открытие попапа создания карточки
popupCardOpenButton.addEventListener('click', () => {
  popupCardValidator.resetValidation();
  popupWithFormCard.open();
});

//открытие попапа редактирования аватара
openPopupEditAvatarButton.addEventListener('click', () => {
  popupEditAvatarValidator.resetValidation();
  popupWithFormEditAvatar.open();
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

//валидация формы аватара
const popupEditAvatarValidator = new FormValidator(
  validationConfig,
  popupEditAvatar
);
popupEditAvatarValidator.enableValidation();
