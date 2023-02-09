export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      return this._renderer(item);
    });
  }

  setItem(item) {
    this._container.prepend(item);
  }
}
