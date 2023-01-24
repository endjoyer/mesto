const popup = document.querySelector('.popup');
let activePopup = null;

export function openPopup(popup) {
  activePopup = popup;
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupByTarget);
  document.addEventListener('keydown', сlosePopupByEscape);
}

export function closePopup() {
  activePopup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupByTarget);
  document.removeEventListener('keydown', сlosePopupByEscape);
}
function closePopupByTarget(e) {
  if (e.target.classList.contains('popup')) {
    closePopup(e.target);
  }
}

function сlosePopupByEscape(e) {
  if (e.code === 'Escape') {
    closePopup(activePopup);
  }
}
