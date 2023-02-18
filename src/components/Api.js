export default class Api {
  constructor(data) {
    this._baseUrl = data.serverUrl;
    this._headers = data.headers;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  getInitialUser() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  editUser(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._requestResult(res));
  }

  editUserAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._requestResult(res));
  }

  postCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._requestResult(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }
}
