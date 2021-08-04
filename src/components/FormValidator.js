import { HTML_NODES } from '../utils/constants';

class FormValidator {
  constructor(elementWithForm, closeMethod) {
    this._htmlElementWithForm = elementWithForm;
    this._form = this._htmlElementWithForm.querySelector('form');
    this._close = closeMethod;
  }

  _showInputError = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = '';
  };

  _showRequestMessage = (message) => {
    const messageElement = this._form.querySelector('p');
    messageElement.textContent = message;
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

  _checkPasswordMatch = (passwordInput, confirmInput) => {
    if (passwordInput.value !== confirmInput.value) {
      this._showRequestMessage('Password mismatch.');
      return false;
    }

    this._showRequestMessage('');
    return true;
  };

  _submitForm = (submitElement, inputElements) => {
    this._setSubmitState(false, submitElement);
    this._resetForm(inputElements);

    if (this._close) {
      this._close();
    }
  };

  validate = () => {
    const formElements = Array.from(this._form.elements);

    const inputElements = formElements.filter(
      (element) => element.nodeName === HTML_NODES.input
    );

    const passwordInputs = inputElements.reduce(
      (acc, input) => (input.type === 'password' ? [...acc, input] : acc),
      []
    );

    const submitElement = formElements.find((element) => {
      return (
        element.nodeName === HTML_NODES.button && element.type === 'submit'
      );
    });

    this._setInputListeners(inputElements, submitElement);

    this._checkFormValidity(inputElements, submitElement);

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      if (passwordInputs.length === 1) {
        this._submitForm(submitElement, inputElements);
      } else if (passwordInputs.length === 2) {
        let matched = this._checkPasswordMatch(...passwordInputs);

        if (matched) {
          this._submitForm(submitElement, inputElements);
        }
      }
    });
  };
}

export default FormValidator;
