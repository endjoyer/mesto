//------------------------------Popup_profile------------------------------

const popup = document.querySelector('.popup');
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
  enableValidation(validationConfig);
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup')) {
      closePopup(e.target);
      setToAddMode();
    }
  });
  document.addEventListener('keydown', closePopupByEscape);
  deleteValidation();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', function (e) {
    if (e.target.classList.contains('popup')) {
      closePopup(e.target);
      setToAddMode();
    }
  });
  document.removeEventListener('keydown', closePopupByEscape);
}

openPopupEditButtons.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup(popupEditProfile);
});

closePopupEditButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

function closePopupByEscape(e) {
  if (e.code === 'Escape') {
    closePopup(popupEditProfile);
    closePopup(popupCard);
    closePopup(popupLookImg);
    setToAddMode();
  }
}

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
let currenEditElementHandler = null;

popupCardOpenButtons.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup(popupCard);
  enableValidation(validationConfig);
  deleteValidation();
});

closePopupButtonCard.addEventListener('click', () => {
  closePopup(popupCard);
  setToAddMode();
});

popupLookImgClose.addEventListener('click', () => {
  closePopup(popupLookImg);
});

//------------------------------Adding_cards------------------------------
//Спасибо за вашу похвалу и заботу о моих нервах. Но я считаю, цель этого проекта, обучить программированию и показать потенциальным работодателям, на что человек способен, а функция редактирования, ни то, что не мешает, а на напротив приятно дополняет функционал. И я не думаю, что несколько строчек кода может затруднить ревю. Насчет будущих потраченных усилий. Я уже потратил немало времени и нервов, для её реализации и не боюсь будущих. Мне конечно же несложно убрать этот код, но я все же хотел бы его оставить, т.к. в будущем его все ровно верну, но это будет, как минимум менее информативно и  интересно. Спасибо за внимание.

function setToEditMode() {
  addElementForm.addEventListener('submit', currenEditElementHandler);
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
  const elementName = element.querySelector('.element__name');
  elementName.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;
  elementImage.addEventListener('click', (e) => {
    e.preventDefault();
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
  element.querySelector('.element__edit').addEventListener('click', () => {
    openPopup(popupCard);
    addElementForm.removeEventListener('submit', currenEditElementHandler);
    currenEditElementHandler = (e) => {
      e.preventDefault();
      elementName.textContent = nameImgInput.value;
      elementImage.src = linkInput.value;
      elementImage.alt = nameImgInput.value;
      setToAddMode();
      closePopup(popupCard);
    };
    nameImgInput.value = elementName.textContent;
    linkInput.value = elementImage.src;
    setToEditMode();
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
