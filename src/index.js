import './index.scss';
import Modal from './components/Modal';
import FormValidator from './components/FormValidator';

const buttonOpenLoginModal = document.querySelector('.header__signin');
const buttonOpenRegisterModal = document.querySelector('.header__signup');
const buttonMenu = document.querySelector('.header__button-menu');

const loginModal = new Modal('.popup_type_login');
const registerModal = new Modal('.popup_type_register');
const sidebar = new Modal('.sidebar');

const loginWithValidation = new FormValidator(
  loginModal.modalHtmlElement,
  loginModal.close
);
const registerWithValidation = new FormValidator(
  registerModal.modalHtmlElement,
  registerModal.close
);

loginWithValidation.validate();
registerWithValidation.validate();

buttonOpenLoginModal.addEventListener('click', loginModal.open);
buttonOpenRegisterModal.addEventListener('click', registerModal.open);
buttonMenu.addEventListener('click', sidebar.open);
