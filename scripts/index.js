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
    popupContainer.classList.add('popup__container_opened');
  });
});

closePopupButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup__container_opened');
});

document.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.remove('popup_opened');
    popupContainer.classList.remove('popup__container_opened');
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
  popupContainer.classList.remove('popup__container_opened');
});
