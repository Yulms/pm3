import initSwitchView from './_switch-view.js';
import initHeaderTopMenu from './_header__top-menu.js';
import initMainNav from './_main-nav.js';
import initBoundedModals from './_modal--bounded.js';
import initModal from './_modal.js';
import initQuantityInput from './_quantity-input.js';
import initTooltips from './_tooltip.js';
import initTextfields from './_textfield.js';
import initCustomSelects from './_custom-select.js';
import initRipple from './_ripple.js';


const projectObjects = { // eslint-disable-line
  switchView: initSwitchView(),
  headerTopMenu: initHeaderTopMenu(),
  mainNav: initMainNav(),
  modalsBounded: initBoundedModals(),
  modal: initModal(),
  quantityInput: initQuantityInput(),
  toolTips: initTooltips(),
  textfields: initTextfields(),
  customSelects: initCustomSelects(),
  ripple: initRipple()
};

console.log(projectObjects);


window.projectObjects = projectObjects;