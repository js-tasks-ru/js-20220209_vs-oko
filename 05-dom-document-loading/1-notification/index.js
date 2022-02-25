export default class NotificationMessage {
  constructor(message = '', {
    duration = 1000,
    type = 'success',
  } = {}) {
    this.duration = duration;
    this.message = message;
    this.type = type;
    this.render();
    NotificationMessage.isAlreadyShow = NotificationMessage.isAlreadyShow ? NotificationMessage.isAlreadyShow.remove(NotificationMessage.isAlreadyShow) : false;
  }
  getTemplate () {
    return `<div class="notification" style="--value:20s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">${this.message}</div>
    </div>
  </div>`;
  }
  render() {
    const element = document.createElement('div'); // (*)
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
    this.element.classList.add(this.type);
  }
  show(element) {
    if (element) {
      element.append(this.element)
    } else document.body.append(this.element);
    NotificationMessage.isAlreadyShow = this.element;
    const timer = setTimeout(() => this.remove(), this.duration);
    return this.element;
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}
