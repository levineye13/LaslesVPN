import './index.scss';
import Modal from './components/Modal';
import FormValidator from './components/FormValidator';
import { createKeysBEMElements } from './utils/utils';
import { selectors, modalSelectors } from './utils/constants';

const findDocumentElements = (selectorList) =>
  selectorList.map((selector) => document.querySelector(selector));

const createModalInstances = (selectorList) =>
  selectorList.map((selector) => ({
    instance: new Modal(selector),
    className: selector,
  }));

const enableValidation = (modalInstances) => {
  modalInstances.forEach((instance) => {
    const elementWithValidation = new FormValidator(
      instance.modalHtmlElement,
      instance.close
    );

    elementWithValidation.validate();
  });
};

const setEventListener = (elements, instances) => {
  const {
    headerButtonMenu,
    headerSignin,
    headerSignup,
    sidebarSignin,
    sidebarSignup,
  } = elements;
  const { sidebar, popupTypeLogin, popupTypeRegister } = instances;

  headerButtonMenu.addEventListener('click', sidebar.instance.open);
  headerSignin.addEventListener('click', popupTypeLogin.instance.open);
  headerSignup.addEventListener('click', popupTypeRegister.instance.open);
  sidebarSignin.addEventListener('click', popupTypeLogin.instance.open);
  sidebarSignup.addEventListener('click', popupTypeRegister.instance.open);
};

//======================================================================================

const elements = createKeysBEMElements(findDocumentElements(selectors));
const modalInstances = createModalInstances(modalSelectors);
const modalElements = createKeysBEMElements(modalInstances);

enableValidation(modalInstances.map((modal) => modal.instance));

setEventListener(elements, modalElements);
