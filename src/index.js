import './index.scss';
import Popup from './components/Popup';
import FormValidator from './components/FormValidator';

const buttonOpenLoginPopup = document.querySelector('.header__signin');
const buttonOpenRegisterPopup = document.querySelector('.header__signup');

const loginPopup = new Popup('.popup_type_login');
const registerPopup = new Popup('.popup_type_register');

const loginWithValidation = new FormValidator(loginPopup.popupHtmlElement);
loginWithValidation.validate();

const registerWithValidation = new FormValidator(
  registerPopup.popupHtmlElement
);
registerWithValidation.validate();

buttonOpenLoginPopup.addEventListener('click', loginPopup.open);
buttonOpenRegisterPopup.addEventListener('click', registerPopup.open);
