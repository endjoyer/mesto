//------------------------------Popup_profile------------------------------

const popup = document.querySelector('.popup');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupEditProfile = document.querySelector('#popup-edit');
const popupEditContainer = popupEditProfile.querySelector('.popup__container');
const openPopupEditButtons = document.querySelector('.profile__edit-batton');
const closePopupEditButton = popupEditProfile.querySelector('.popup__close');
const nameInput = document.querySelector("input[name='name']");
const jobInput = document.querySelector("input[name='about-me']");
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupByTarget);
  document.addEventListener('keydown', сlosePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupByTarget);
  document.removeEventListener('keydown', сlosePopupByEscape);
}
function closePopupByTarget(e) {
  if (e.target.classList.contains('popup')) {
    closePopup(e.target);
  }
}

function сlosePopupByEscape(e) {
  popups.forEach((popup) => {
    if (e.code === 'Escape' && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
}

openPopupEditButtons.addEventListener('click', () => {
  openPopup(popupEditProfile);
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
const button = addElementForm.querySelector('.popup__btn');
const popupLookImg = document.querySelector('.popup-look-img');
const popupLookImgContainer = document.querySelector(
  '.popup-look-img__container'
);
const popupLookImgTitle = document.querySelector('.popup-look-img__title');
const popupLookImgClose = popupLookImg.querySelector('.popup__close');
const pictureFull = document.querySelector('.popup-look-img__image');

popupCardOpenButtons.addEventListener('click', () => {
  openPopup(popupCard);
});

closePopupButtonCard.addEventListener('click', () => {
  closePopup(popupCard);
});

popupLookImgClose.addEventListener('click', () => {
  closePopup(popupLookImg);
});

//------------------------------Adding_cards------------------------------
//Спасибо большое за информативный, развёрнутый ответ. Видимо все же придется отказать от этой идеи. Видимо моих знаний не достаточно, для ее рализации, по вашим требованиям. Но надеюсь это не на всегда

const createCard = ({ name, link }) => {
  const element = document
    .querySelector('#element-template')
    .content.querySelector('.element')
    .cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__name');
  elementName.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;
  elementImage.addEventListener('click', () => {
    pictureFull.src = elementImage.src;
    openPopup(popupLookImg);
    pictureFull.alt = elementImage.alt;
    popupLookImgTitle.textContent = pictureFull.alt;
  });
  element.querySelector('.element__delete').addEventListener('click', () => {
    element.remove();
  });
  element.querySelector('.element__like').addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_active');
  });

  return element;
};

const renderCard = ({ name, link }) => {
  elementsContainer.prepend(createCard({ name, link }));
};

elementsContainer.append(...initialCards.map(createCard));

const addElement = (e) => {
  e.preventDefault();
  const name = nameImgInput.value;
  const link = linkInput.value;
  nameImgInput.value = '';
  linkInput.value = '';
  renderCard({ name, link });
  closePopup(popupCard);
};

addElementForm.addEventListener('submit', addElement);

enableValidation(validationConfig);
