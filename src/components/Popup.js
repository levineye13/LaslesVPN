import { keyCodeESC } from '../utils/constants';

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close');
    this._openedPopup = 'popup_opened';
  }

  open = () => {
    this._popup.classList.add(this._openedPopup);
    this._setEventListener();
  };

  close = () => {
    this._popup.classList.remove(this._openedPopup);
    this._removeEventListener();
  };

  _setEventListener = () => {
    this._buttonClose.addEventListener('click', this._handleButtonClose);
    this._popup.addEventListener('click', this._handleScreenClose);
    document.addEventListener('keydown', this._handleEscClose);
  };

  _removeEventListener = () => {
    this._buttonClose.removeEventListener('click', this._handleButtonClose);
    this._popup.removeEventListener('click', this._handleScreenClose);
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
