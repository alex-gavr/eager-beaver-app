const getIsTestVariable = (name: string, phone: string) => {
  const testVariables =
    phone === '(999) 999-99-99' ||
    phone === '(909) 378-66-78' ||
    name === 'test' ||
    name === 'тест' ||
    name === 'Test' ||
    name === 'Alexander' ||
    name === 'alexander' ||
    name === 'Тест';

  return testVariables;
};
export default getIsTestVariable;
