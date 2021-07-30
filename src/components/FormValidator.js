class FormValidator {
  constructor(elementWithForm) {
    this._htmlElementWithForm = elementWithForm;
    this._form = this._htmlElementWithForm.querySelector('form');
  }

  _setSubmitState = (isFormValid, submitElement) => {
    if (isFormValid) {
      return submitElement.removeAttribute('disabled');
    }
    return submitElement.setAttribute('disabled', true);
  };

  _checkInputValidity = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _checkFormValidity = (inputElements, submitElement) => {
    const isValidInputs = !this._checkInputValidity(inputElements);
    console.log(isValidInputs);
    this._setSubmitState(isValidInputs, submitElement);
  };

  _setInputListeners = (inputList, submitElement) => {
    inputList.forEach((input) => {
      input.addEventListener('input', () =>
        this._checkFormValidity(inputList, submitElement)
      );
    });
  };

  validate = () => {
    const formElements = Array.from(this._form.elements);

    const inputElements = formElements.filter(
      (element) => element.nodeName === 'INPUT'
    );

    const submitElement = formElements.find((element) => {
      return element.nodeName === 'BUTTON' && element.type === 'submit';
    });

    this._setInputListeners(inputElements, submitElement);

    this._checkFormValidity(inputElements, submitElement);
  };
}

export default FormValidator;
