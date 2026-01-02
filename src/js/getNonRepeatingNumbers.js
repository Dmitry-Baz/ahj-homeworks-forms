export default function getNonRepeatingNumbers(arrayLength = 12, range = 1000) {
  if (typeof arrayLength !== 'number' || typeof range !== 'number') {
    throw new Error('The `arrayLength` and `range` parameters must be numbers');
  }

  const numbers = [];

  while (numbers.length < arrayLength) {
    const randomNumber = Math.ceil(Math.random() * range);
    let found = false;

    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] === randomNumber) {
        found = true;
        break;
      }
    }

    if (!found) numbers[numbers.length] = randomNumber;
  }

  return numbers;
}
