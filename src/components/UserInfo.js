export default class UserInfo {
  constructor({ title, subtitle, avatar }) {
    this._title = document.querySelector(title);
    this._subtitle = document.querySelector(subtitle);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      title: this._title,
      subtitle: this._subtitle,
      avatar: this._avatar,
    };
  }

  setUserInfo(data) {
    this._title.textContent = data.name;
    this._subtitle.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
