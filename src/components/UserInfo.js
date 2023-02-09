export default class UserInfo {
  constructor({ title, subtitle }) {
    this._title = document.querySelector(title);
    this._subtitle = document.querySelector(subtitle);
  }

  getUserInfo() {
    return {
      title: this._title,
      subtitle: this._subtitle,
    };
  }

  setUserInfo(title, subtitle) {
    this._title.textContent = title;
    this._subtitle.textContent = subtitle;
  }
}
