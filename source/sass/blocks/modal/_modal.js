import { isEscapePressEvent } from './util.js';


class Modal {
  constructor(overrides) {

    const defaults = {
      openButtonSelector: undefined,
      modalSelector: undefined,
      closeModalClass : 'modal--closed',
      closeButtonSelector : '.modal__js-close-button',
      overlaySelector : 'overlay',
      showDelay : 200,
      closeDelay : 200
    };

    Object.assign(this, defaults, overrides);


    this._isOpened = false;
    this._buttonElement = document.querySelector(this.openButtonSelector);
    this._buttonElement.addEventListener('click', this._showModal.bind(this));
    this._buttonElement.addEventListener('mouseenter', (evt) => {
      this._timerOpenId = setTimeout(() => this._showModal(evt), this.showDelay);
    });
    this._buttonElement.addEventListener('mouseleave', () => clearTimeout(this._timerOpenId));
    this._modalSelector = this.modalSelector;
  }


  _showModal (evt) {

    const createElements = () => {
      if (!this._modalElement) {
        this._modalElement = document.querySelector(this._modalSelector);
      }
      if (!this._closeButtonElement) {
        this._closeButtonElement = this._modalElement.querySelector(this.closeButtonSelector);
      }
    };

    const addOverlay = () => {
      this._overlayElement = document.createElement('div');
      this._overlayElement.classList.add(this.overlaySelector);
      this._modalElement.before(this._overlayElement);
    };

    const removeCloseClass = () => {
      this._modalElement.classList.remove(this.closeModalClass);
    };

    const addHandlers = () => {
      this._onOverlayClick = () => {
        clearTimeout(this._timerCloseId);
        this._closeModal();
      };

      this._onDocumentKeydown = (evt) => {
        isEscapePressEvent(evt, this._closeModal.bind(this));
      };

      this._onCloseButtonClick = () => {
        this._closeModal();
      };

      this._onModalMouseLeave = () => {
        this._timerCloseId = setTimeout(() => this._closeModal(), this.closeDelay);
      };

      this._onModalMouseEnter = () => {
        clearTimeout(this._timerCloseId);
      };

      this._overlayElement.addEventListener('click', this._onOverlayClick);
      document.addEventListener('keydown', this._onDocumentKeydown);
      if (this._closeButtonElement) {
        this._closeButtonElement.addEventListener('click', this._onCloseButtonClick);
      }
      this._modalElement.addEventListener('mouseleave', this._onModalMouseLeave);
      this._modalElement.addEventListener('mouseenter', this._onModalMouseEnter);
    };


    if (this._isOpened) return;
    evt.preventDefault();
    createElements();
    addOverlay();
    removeCloseClass();
    addHandlers();
    this._isOpened = true;
  }


  _closeModal() {
    const removeOverlay = () => {
      this._overlayElement.remove();
    };

    const addCloseClass = () => {
      this._modalElement.classList.add(this.closeModalClass);
    };

    const removeHandlers = () => {
      this._overlayElement.removeEventListener('click', this._onOverlayClick);
      document.removeEventListener('keydown', this._onDocumentKeydown);
      if (this._closeButtonElement) {
        this._closeButtonElement.removeEventListener('click', this._onCloseButtonClick);
      }
      this._modalElement.removeEventListener('mouseleave', this._onModalMouseLeave);
      this._modalElement.removeEventListener('mouseenter', this._onModalMouseEnter);
    };

    removeOverlay();
    addCloseClass();
    removeHandlers();
    this._isOpened = false;
  }
}



function initModals() {
  let modals = [];

  const modalContactsArgs = {
    openButtonSelector: '.header__contacts-button',
    modalSelector: '.header__contacts'
  };

  const modalUserArgs = {
    openButtonSelector: '.header__user .header__link',
    modalSelector: '.header__user'
  };

  const modalCartArgs = {
    openButtonSelector: '.header__cart .header__link',
    modalSelector: '.header__cart'
  };

  modals.push(new Modal(modalContactsArgs));
  modals.push(new Modal(modalUserArgs));
  modals.push(new Modal(modalCartArgs));

  return modals;
}


export default initModals;
