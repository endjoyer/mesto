//------------------------------Popup_profile------------------------------

const popupEdit = document.querySelector('#popup-edit');
const popupEditContainer = popupEdit.querySelector('.popup__container');
const openPopupEditButtons = document.querySelectorAll('.profile__edit-batton'); // при удалении All все ломаеться, пока не понял почему, но в консоли пишет, что это не функция. Ничего не понятно, но очень интересно )
const closePopupEditButton = popupEdit.querySelector('.popup__close');
const nameInput = document.querySelector("input[name='name']");
const jobInput = document.querySelector("input[name='about-me']");
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup(popupEdit, popupEditContainer) {
  popupEdit.classList.add('popup_opened');
  popupEditContainer.classList.add('popup__container_opened');
}

function closePopup(popupEdit, popupEditContainer) {
  popupEdit.classList.remove('popup_opened');
  popupEditContainer.classList.remove('popup__container_opened');
}

openPopupEditButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(popupEdit, popupEditContainer);
  });
});

closePopupEditButton.addEventListener('click', () => {
  closePopup(popupEdit, popupEditContainer);
});

document.addEventListener('click', (e) => {
  if ((e.target = e.target.classList.contains('popup'))) {
    closePopup(popupEdit, popupEditContainer);
    closePopup(popupCard, addElementForm);
    closePopup(popupLookImg, popupLookImgContainer);
    setToAddMode();
  }
});

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit, popupEditContainer);
}

popupEditContainer.addEventListener('submit', handleFormEditSubmit);

//------------------------------Popup_card------------------------------
//------------------------------Open_popup------------------------------

const popupCard = document.querySelector('#popup-add');
const popupCardOpenButtons = document.querySelectorAll('.profile__add-batton');
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
let currenEditElementHandler = null;

popupCardOpenButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(popupCard, addElementForm);
  });
});

closePopupButtonCard.addEventListener('click', () => {
  closePopup(popupCard, addElementForm);
  setToAddMode();
});

popupLookImgClose.addEventListener('click', () => {
  closePopup(popupLookImg, popupLookImgContainer);
});

//------------------------------Adding_cards------------------------------

function setPopupCardEditMode({ name, link }, newEditHandler) {
  addElementForm.removeEventListener('submit', currenEditElementHandler);
  addElementForm.addEventListener('submit', newEditHandler);
  nameImgInput.value = name;
  linkInput.value = link;
  addElementForm.removeEventListener('submit', addElement);
}

function setToAddMode() {
  nameImgInput.value = '';
  linkInput.value = '';
  addElementForm.addEventListener('submit', addElement);
  addElementForm.removeEventListener('submit', currenEditElementHandler);
}

const createCard = ({ name, link }) => {
  const element = document
    .querySelector('#element-template')
    .content.querySelector('.element')
    .cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  element.querySelector('.element__name').textContent = name;
  elementImage.src = link;
  elementImage.alt = name;
  elementImage.addEventListener('click', (e) => {
    e.preventDefault();
    pictureFull.src = elementImage.src;
    popupLookImgContainer.append(pictureFull);
    openPopup(popupLookImg, popupLookImgContainer);
    pictureFull.alt = elementImage.alt;
    popupLookImgTitle.textContent = pictureFull.alt;
  });
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
  element.querySelector('.element__edit').addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(popupCard, addElementForm);
    const newEditElementHandler = {
      currenEditElementHandler: (e) => {
        // Я очень старался, но так и не понял, что я сделал не так )
        e.preventDefault();
        element.querySelector('.element__name').textContent =
          nameImgInput.value;
        elementImage.src = linkInput.value;
        elementImage.alt = nameImgInput.value;
        setToAddMode();
        deleteClassOpenPopupCard();
      },
    };
    setPopupCardEditMode({ name, link }, newEditElementHandler);
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
  closePopup(popupCard, addElementForm);
};

addElementForm.addEventListener('submit', addElement);

//---------------------backup-createCard-----------------
// const createCard = ({ name, link }) => {
//   const element = document
//     .querySelector('#element-template')
//     .content.querySelector('.element')
//     .cloneNode(true);
//   element.querySelector('.element__name').textContent = name;
//   element.querySelector('.element__image').src = link;
//   element.querySelector('.element__image').alt = name;
//   element.querySelector('.element__delete').addEventListener('click', () => {
//     element.remove();
//   });
//   element.querySelector('.element__edit').addEventListener('click', (e) => {
//     e.preventDefault();
//     popupCard.classList.add('popup_opened');
//     addElementForm.classList.add('popup__container_opened');
//   });
//   element.querySelector('.element__like').addEventListener('click', (e) => {
//     e.target.classList.toggle('element__like_active');
//   });
//   element.querySelector('.element__edit').addEventListener('click', () => {
//     addElementForm.removeEventListener('submit', currenEditElementHandler);
//     currenEditElementHandler = (e) => {
//       e.preventDefault();
//       element.querySelector('.element__name').textContent = nameImgInput.value;
//       element.querySelector('.element__image').src = linkInput.value;
//       setToAddMode();
//       closePopupCard();
//     };
//     seToEditMode({ name, link });
//   });

//   return element;
// };
