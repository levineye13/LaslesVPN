import './index.scss';
import Modal from './components/Modal';
import FormValidator from './components/FormValidator';
import { createKeysBEMElements } from './utils/utils';

const findDocumentElements = (selectorList) =>
  selectorList.map((selector) => document.querySelector(selector));

const createModalInstances = (selectorList) =>
  selectorList.map((selector) => new Modal(selector));

const enableValidation = (modalInstances) => {
  modalInstances.forEach((instance) => {
    const elementWithValidation = new FormValidator(
      instance.modalHtmlElement,
      instance.close
    );

    elementWithValidation.validate();
  });
};

const setEventListener = ({ element, eventType, callback }) => {
  element.addEventListener(eventType, callback);
  // buttonMenu.addEventListener('click', sidebar.open);
  // headerOpenLoginModal.addEventListener('click', loginModal.open);
  // headerOpenRegisterModal.addEventListener('click', registerModal.open);
  // sidebarOpenLoginModal.addEventListener('click', loginModal.open);
  // sidebarOpenRegisterModal.addEventListener('click', registerModal.open);
};

//=============================================================

const selectors = [
  '.header__button-menu',
  '.header__signin',
  '.header__signup',
  '.sidebar__signin',
  '.sidebar__signup',
];

const modalSelectors = [
  '.popup_type_login',
  '.popup_type_register',
  '.sidebar',
];

const elements = createKeysBEMElements(findDocumentElements(selectors));
console.log(elements);

const modalInstances = createModalInstances(modalSelectors);
console.log(modalInstances);

const modalElements = createKeysBEMElements(
  modalInstances.map((instance) => instance.modalHtmlElement)
);
console.log(modalElements);

enableValidation(modalInstances);

Object.keys(elements).forEach((element) => {
  const current = elements[element];
  console.log(current);
  setEventListener({
    element: current,
    eventType: 'click',
    callback: current.open,
  });
});
