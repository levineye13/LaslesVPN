import './index.scss';
import Popup from './components/Popup';

const buttonOpenLoginPopup = document.querySelector('.header__signin');
const buttonOpenRegisterPopup = document.querySelector('.header__signup');

const loginPopup = new Popup('.popup_type_login');
const registerPopup = new Popup('.popup_type_register');

buttonOpenLoginPopup.addEventListener('click', loginPopup.open);
buttonOpenRegisterPopup.addEventListener('click', registerPopup.open);
