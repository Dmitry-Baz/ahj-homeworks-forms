// TODO: write code here

import Popover from '../components/popover/Popover';
import getNonRepeatingNumbers from './getNonRepeatingNumbers';

document.addEventListener('DOMContentLoaded', () => {
  const popoverToggles = document.querySelectorAll('.popover-toggle');
  const nonRepeatingNumbers = getNonRepeatingNumbers(popoverToggles.length);

  [...popoverToggles].forEach((toggle, index) => {
    const id = nonRepeatingNumbers[index];
    const popover = new Popover(toggle, id);
    popover.bindToDOM();
  });
});
