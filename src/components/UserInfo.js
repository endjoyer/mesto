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

  setUserInfo(data) {
    this._title.textContent = data.name;
    this._subtitle.textContent = data.about;
  }
}
