import './popover.css';

export default class Popover {
  __abortController = null;

  constructor(popoverToggle, id) {
    if (typeof id !== 'number') {
      throw new Error('The `id` parameter must be a number');
    }

    this.id = id;
    this.popoverToggle = popoverToggle;
    this.title = popoverToggle.dataset.title || '';
    this.info = popoverToggle.dataset.info || '';

    this.onClick = this.onClick.bind(this);
  }

  get selector() {
    return `.popover[data-id="${this.id}"]`;
  }

  bindToDOM() {
    this.popoverToggle.addEventListener('click', this.onClick);
  }

  destroy() {
    this.popoverToggle.removeEventListener('click', this.onClick);
    this.hide();
  }

  onClick() {
    const existing = document.querySelector(this.selector);
    if (existing) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this.hide();

    const popover = document.createElement('div');
    popover.className = 'popover';
    popover.dataset.id = this.id;

    const titleEl = document.createElement('div');
    titleEl.className = 'popover__title';
    titleEl.textContent = this.title;

    const infoEl = document.createElement('div');
    infoEl.className = 'popover__info';
    infoEl.textContent = this.info;

    const arrow = document.createElement('div');
    arrow.className = 'popover__arrow';

    popover.append(titleEl, infoEl, arrow);
    document.body.append(popover);
    this.element = popover;

    this.position();

    this.__abortController = new AbortController();
    window.addEventListener('resize', () => this.position(), {
      signal: this.__abortController.signal,
    });
  }

  hide() {
    if (this.__abortController) {
      this.__abortController.abort();
      this.__abortController = null;
    }
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  position() {
    if (!this.element) return;

    const toggleRect = this.popoverToggle.getBoundingClientRect();
    const popoverRect = this.element.getBoundingClientRect();
    const arrow = this.element.querySelector('.popover__arrow');

    const arrowHeight = arrow ? arrow.offsetHeight : 0;

    this.element.style.left = `${
      toggleRect.left + toggleRect.width / 2 - popoverRect.width / 2
    }px`;
    this.element.style.top = `${
      toggleRect.top - popoverRect.height - arrowHeight + 1
    }px`;
  }
}
