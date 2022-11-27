//Код без плавного перехода, на случай, если с плавным неподходит(позже будет убран)

/* const enitButton = document.querySelector('.profile__edit-batton');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

enitButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
}

function closePopup(event) {
  popup.classList.remove('popup_opened');
}

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
}); */

//Код с плавным переходом

let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let openPopupButtons = document.querySelectorAll('.profile__edit-batton');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector("input[name='name']");
let jobInput = document.querySelector("input[name='about-me']");
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let submit = document.querySelector('.popup__btn');

openPopupButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('popup_opened');
    popupContainer.classList.add('popup_opened'); //Такой метод реализован, для плавного открытия и закрытия попапа, другого метода реализации моей задумки, я не могу придумать
  });
});

closePopupButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup_opened');
});

document.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.remove('popup_opened');
    popupContainer.classList.remove('popup_opened');
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);

submit.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup_opened');
});
