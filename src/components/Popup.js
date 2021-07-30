import { keyCodeESC, htmlNodeNames } from '../utils/constants';

class Popup {
  constructor(popupSelector) {
    this.popupHtmlElement = document.querySelector(popupSelector);
    this._buttonClose = this.popupHtmlElement.querySelector('.popup__close');
    this._openedPopup = 'popup_opened';
  }

  open = () => {
    this.popupHtmlElement.classList.add(this._openedPopup);
    this._setEventListener();
  };

  close = () => {
    this.popupHtmlElement.classList.remove(this._openedPopup);
    this._removeEventListener();
    this._resetForm();
  };

  _resetForm = () => {
    const formElement = this.popupHtmlElement.querySelector('form');

    Array.from(formElement.elements).forEach((element) => {
      if (element.nodeName === htmlNodeNames.input) {
        element.value = '';
      }
    });
  };

  _setEventListener = () => {
    this._buttonClose.addEventListener('click', this._handleButtonClose);
    this.popupHtmlElement.addEventListener('click', this._handleScreenClose);
    document.addEventListener('keydown', this._handleEscClose);
  };

  _removeEventListener = () => {
    this._buttonClose.removeEventListener('click', this._handleButtonClose);
    this.popupHtmlElement.removeEventListener('click', this._handleScreenClose);
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleButtonClose = () => this.close();

  _handleScreenClose = ({ target }) => {
    if (target.classList.contains(this._openedPopup)) {
      this.close();
    }
  };

  _handleEscClose = (evt) => {
    if (evt.keyCode === keyCodeESC) {
      this.close();
    }
  };
}

export default Popup;
