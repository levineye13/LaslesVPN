import { htmlNodeNames } from '../utils/constants';

class FormValidator {
  constructor(elementWithForm) {
    this._htmlElementWithForm = elementWithForm;
    this._form = this._htmlElementWithForm.querySelector('form');
  }

  _showInputError = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = '';
  };

  _setSubmitState = (isFormValid, submitElement) => {
    if (isFormValid) {
      return submitElement.removeAttribute('disabled');
    }
    return submitElement.setAttribute('disabled', true);
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  _resetForm = (inputList) => {
    inputList.forEach((input) => (input.value = ''));
  };

  _checkFormValidity = (inputElements, submitElement) => {
    const isValidInputs = !this._hasInvalidInput(inputElements);
    this._setSubmitState(isValidInputs, submitElement);
  };

  _setInputListeners = (inputList, submitElement) => {
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._checkFormValidity(inputList, submitElement);
      });
    });
  };

  validate = () => {
    const formElements = Array.from(this._form.elements);

    const inputElements = formElements.filter(
      (element) => element.nodeName === htmlNodeNames.input
    );

    const submitElement = formElements.find((element) => {
      return (
        element.nodeName === htmlNodeNames.button && element.type === 'submit'
      );
    });

    this._setInputListeners(inputElements, submitElement);

    this._checkFormValidity(inputElements, submitElement);

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._setSubmitState(false, submitElement);
      this._resetForm(inputElements);
    });
  };
}

export default FormValidator;
