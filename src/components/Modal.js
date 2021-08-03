import { keyCodeESC } from '../utils/constants';

class Modal {
  constructor(modalSelector) {
    this.modalHtmlElement = document.querySelector(modalSelector);
    this._modalType = this.modalHtmlElement.classList[0];
    this._buttonClose = this.modalHtmlElement.querySelector('.button-close');
    this._openedModal = `${this._modalType}_opened`;
  }

  open = () => {
    this.modalHtmlElement.classList.add(this._openedModal);
    this._setEventListener();
  };

  close = () => {
    this.modalHtmlElement.classList.remove(this._openedModal);
    this._removeEventListener();
  };

  _setEventListener = () => {
    this._buttonClose.addEventListener('click', this._handleButtonClose);
    this.modalHtmlElement.addEventListener('click', this._handleScreenClose);
    document.addEventListener('keydown', this._handleEscClose);
  };

  _removeEventListener = () => {
    this._buttonClose.removeEventListener('click', this._handleButtonClose);
    this.modalHtmlElement.removeEventListener('click', this._handleScreenClose);
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleButtonClose = () => this.close();

  _handleScreenClose = ({ target }) => {
    if (target.classList.contains(this._openedModal)) {
      this.close();
    }
  };

  _handleEscClose = (evt) => {
    if (evt.keyCode === keyCodeESC) {
      this.close();
    }
  };
}

export default Modal;
