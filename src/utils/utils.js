export const createKeysBEMElements = (elements) => {
  return elements.reduce((acc, element) => {
    const { className } = element;

    let prevIsLetter = false;
    let result = '';

    for (const symbol of className) {
      const currentIsLetter = /[a-z]/i.test(symbol);

      if (currentIsLetter && prevIsLetter) {
        prevIsLetter = true;
        result += symbol;
      } else if (currentIsLetter && !prevIsLetter) {
        prevIsLetter = true;
        result += symbol.toUpperCase();
      } else {
        prevIsLetter = false;
      }
    }

    return {
      ...acc,
      [`${result[0].toLowerCase()}${result.slice(1)}`]: element,
    };
  }, {});
};
