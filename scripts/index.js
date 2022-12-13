//------------------------------Popup_profile------------------------------

const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const openPopupButtons = document.querySelectorAll('.profile__edit-batton');
const closePopupButton = document.querySelector('.popup__close');
const nameInput = document.querySelector("input[name='name']");
const jobInput = document.querySelector("input[name='about-me']");
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function deleteClassOpenPopup() {
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup__container_opened');
}

openPopupButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('popup_opened');
    popupContainer.classList.add('popup__container_opened');
  });
});

closePopupButton.addEventListener('click', () => {
  deleteClassOpenPopup();
});

document.addEventListener('click', (e) => {
  if (e.target === popup) {
    deleteClassOpenPopup();
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  deleteClassOpenPopup();
}

popupContainer.addEventListener('submit', handleFormSubmit);

//------------------------------Popup_card------------------------------
//------------------------------Open_popup------------------------------

const initialCards = [
  {
    name: 'Барселона',
    link: 'https://images.unsplash.com/photo-1633371357278-09544be784e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  },
  {
    name: 'Греция',
    link: 'https://images.unsplash.com/photo-1605153322277-dd0d7f608b4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80',
  },
  {
    name: 'Остров Орлеан',
    link: 'https://images.unsplash.com/photo-1573150323998-539f450322de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
  },
  {
    name: 'Бледское озеро',
    link: 'https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Вернацца',
    link: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Йеллоустонский национальный парк',
    link: 'https://images.unsplash.com/photo-1570654230464-9cf6d6f0660f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
];

const popupCard = document.querySelector('.popup_add');
const openPopupButtonsCard = document.querySelectorAll('.profile__add-batton');
const closePopupButtonCard = document.querySelector('.popup__close_add');
const elementsContainer = document.querySelector('.elements__container');
const addElementForm = document.querySelector('.popup__container_add');
const nameImgInput = addElementForm.querySelector("input[name='name-img']");
const linkInput = addElementForm.querySelector("input[name='link']");
const button = addElementForm.querySelector('.popup__btn');
let editElement = null;

function deleteClassOpenPopupCard() {
  popupCard.classList.remove('popup_opened');
  addElementForm.classList.remove('popup__container_opened');
  setToAddMode();
}

openPopupButtonsCard.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    popupCard.classList.add('popup_opened');
    addElementForm.classList.add('popup__container_opened');
  });
});

closePopupButtonCard.addEventListener('click', () => {
  deleteClassOpenPopupCard();
});

document.addEventListener('click', (e) => {
  if (e.target === popupCard) {
    deleteClassOpenPopupCard();
  }
});

//------------------------------Adding_cards------------------------------

// Надеюсь мне не придется убирать редактирование )
function seToEditMode({ name, link }) {
  addElementForm.addEventListener('submit', editElement);
  nameImgInput.value = name;
  linkInput.value = link;
  addElementForm.removeEventListener('submit', addElement);
}

function setToAddMode() {
  nameImgInput.value = '';
  linkInput.value = '';
  addElementForm.addEventListener('submit', addElement);
  addElementForm.removeEventListener('submit', editElement);
}

const createCard = ({ name, link }) => {
  const template = document.querySelector('#element-template');
  const element = template.content.querySelector('.element').cloneNode(true);
  element.querySelector('.element__name').textContent = name;
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = name;
  element.querySelector('.element__delete').addEventListener('click', () => {
    element.remove();
  });
  element.querySelector('.element__edit').addEventListener('click', (e) => {
    e.preventDefault();
    popupCard.classList.add('popup_opened');
    addElementForm.classList.add('popup__container_opened');
  });
  element.querySelector('.element__like').addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_active');
  });
  element.querySelector('.element__edit').addEventListener('click', () => {
    addElementForm.removeEventListener('submit', editElement);
    editElement = (e) => {
      e.preventDefault();
      element.querySelector('.element__name').textContent = nameImgInput.value;
      element.querySelector('.element__image').src = linkInput.value;
      setToAddMode();
      deleteClassOpenPopupCard();
    };
    seToEditMode({ name, link });
  });

  return element;
};

const renderCard = ({ name, link }) => {
  elementsContainer.prepend(createCard({ name, link }));
};

elementsContainer.append(...initialCards.map(createCard));

const addElement = (event) => {
  event.preventDefault();
  const name = nameImgInput.value;
  const link = linkInput.value;
  renderCard({ name, link });
  deleteClassOpenPopupCard();
};

addElementForm.addEventListener('submit', addElement);

//------------------------------Popup-look-img------------------------------

const popupLookImg = document.querySelector('.popup-look-img');
const popupLookImgContainer = document.querySelector(
  '.popup-look-img__container'
);
const popupLookImgTitle = document.querySelector('.popup-look-img__title');
const picture = Array.from(document.querySelectorAll('.element__image'));
const popupLookImgClose = document.querySelector('.popup-look-img__close');
let cardIndex = -1;
let pictureFull;

// Двое суток пытался сделать, чтобы открывались новые карточки, но даже с подсказками наставника ничего не получилось (
picture.forEach((card) => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    cardIndex = picture.indexOf(card);
    pictureFull = picture[cardIndex].cloneNode();
    popupLookImgContainer.append(pictureFull);
    popupLookImg.classList.add('popup_opened');
    popupLookImgContainer.classList.add('popup__container_opened');
    const pictureText = popupLookImgContainer.querySelector('.element__image');
    popupLookImgTitle.textContent = pictureText.alt;
    pictureFull.style =
      'min-width: 0; max-width: 75vw; max-height: 75vh; border-top-left-radius: 0;border-top-right-radius: 0;';
  });
});

function deleteClasslookImgOpened() {
  popupLookImg.classList.remove('popup_opened');
  popupLookImgContainer.classList.remove('popup__container_opened');
  pictureFull.remove();
}

popupLookImgClose.addEventListener('click', () => {
  deleteClasslookImgOpened();
});

document.addEventListener('click', (e) => {
  if (e.target === popupLookImg) {
    deleteClasslookImgOpened();
  }
});
