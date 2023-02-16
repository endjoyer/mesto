// import './index.css';
// import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/popupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
// import { initialCards } from '../utils/initialCards.js';
import Card from '../components/card.js';
import { validationConfig } from '../utils/validationConfig.js';
import FormValidator from '../components/FormValidator.js';

const popupEditProfile = document.querySelector('#popup-edit');
const openPopupEditButtons = document.querySelector('.profile__edit-batton');
const popupCard = document.querySelector('#popup-add');
const popupCardOpenButtons = document.querySelector('.profile__add-batton');
const popupLookImg = document.querySelector('.popup-look-img');
const popupConfirmation = document.querySelector('#popup-confirmation');
const popupConfirmationBatton = popupConfirmation.querySelector('.popup__btn');
const popupEditContainer = popupEditProfile.querySelector('.popup__container');
const editNameInput = popupEditContainer.elements.name;
const editJobInput = popupEditContainer.elements.about;
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
let userId;
const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-60/',
  headers: {
    authorization: '6a189007-b75f-4743-b5a0-635bc162974c',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getInitialCards(), api.getInitialUser()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// function initNumberLikes(item) {
//   numberLikes.textContent = item.likes.lenght;
// }
// api
//   .getInitialCards()
//   .then((res) => {
//     console.log(res);

//     cardsList.renderItems(res.reverse());
//     res.forEach((item) => {
//       if (item.owner._id !== '3d632616932c3af1b8bcdffa') {
//         document.querySelector('.element__delete').setAttribute('hidden', '');
//         // console.log(item.owner._id);
//       }
//     });
//3d632616932c3af1b8bcdffa
// const numberLikes = document.querySelector('.element__number-likes');
// res.forEach((item) => {
//   numberLikes.textContent = item.likes.length;
// });
// })
// .catch((err) => {
//   console.log(err);
// });

api
  .getInitialUser()
  .then((res) => {
    userName.textContent = res.name;
    userJob.textContent = res.about;
  })
  .catch((err) => {
    console.log(err);
  });

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
  avatar: '.profile__avatar',
});

//создание класса попапа открытия картинки
const popupWithImage = new PopupWithImage(popupLookImg);

popupWithImage.setEventListeners();

//создание карточки с назавнием и ссылкой в попапе
const popupWithFormCard = new PopupWithForm(popupCard, (item) => {
  api
    .postCard(item)
    .then((res) => {
      cardsList.setItem(createCard(res));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  popupWithFormCard.close();
});

popupWithFormCard.setEventListeners();

//рендер карточек на страницу из массива
const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.setItem(createCard(item));
      // initNumberLikes(item);
    },
  },
  '.elements__container'
);

//отравка текста редактирования профиля на страницу
function submitEditProfileForm(data) {
  // api.userObj(editNameInput.value, editJobInput.value);
  api
    .editUser(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  popupWithFormEditProfile.close();
}

// // //Определение карточки
// // function setCard(item) {
// //   return card;
// // }

// popupConfirmationBatton.addEventListener('click', (item) => {
//   setCard(item).handleDeleteCard();
// });

//создание класса попапа подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(popupConfirmation);
popupWithConfirmation.setEventListeners();

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
            popupWithConfirmation.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
  });
  return card.generateCard();
  // return setCard(item).generateCard();
};

// cardList.renderItems(initialCards.reverse());

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
