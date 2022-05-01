import { accordion, filterFaqs, listenerClickMenu } from './accordion';
import { changeSelectValue, buttonChoices, blurCard } from './index-product';
import { addPlus } from './quantity';
import { addCartSubmit, loadCheckoutUpsellEvent } from './cart/cart';
import { cartOpen } from './cart/open-close';
import { createVariants } from './utils/productData';

import './styles/app.css';
import './styles/normalize.css';
import './styles/blog.css';
import './styles/article.css';
import './styles/product.css';
import './styles/home.css';
import './styles/contact.css';
import './styles/login.css';
import './styles/collections.css';
import './styles/cart.css';
import './styles/silo.css';
import './styles/bundle.css';
import './styles/account.css';
import './styles/cart-page.css'
import './styles/faq.css'
import './styles/wholesale.css'
import './styles/suscription.css'

import { sliderCarrousel, sliderFunction } from './slider';

/* import { eventRipple } from './ripple'; */

import { Menu } from './menu';
import { applyCode } from './bundles/code-redux';
import { scrollCash } from './scroll-touch';
import { eventItemNavigation } from './account/navigation';
import { openFormEdit } from './account/forms-addresse';
import { quantityCartPage, removeProductCart } from './cart/cart-section';
import { selectCountry } from './currency/country-select';
import { displayRecover, validatePassword } from './login/validations';
import { lazyImagesInscription } from './lazy/images-lazy';
import { intersectionByContainer } from './lazy/intersection';
import { clickCloseBtnModal, clickDeleteSubs, listenerFormsSuscriptions, onChangeFrequencySelector, onChangeInputSuscription, resetDateInput } from './suscriptions/customer-portal';
import { openElementSibling } from './interactions/hidden-sibling';

import { SaveLocalLanguage } from './translateAPP/saveLocal';
import { geoFindMe } from './geolocal';

window.localSave = new SaveLocalLanguage();

/* === logic cart side and CART.JS === */
addCartSubmit();
createVariants();

/* === ACCOUNT === */
eventItemNavigation();
openFormEdit();
displayRecover();
validatePassword();

/* === CART PAGE === */
quantityCartPage();
addPlus(".quantity-item-page");
removeProductCart();

/* === menu interactive === */

window.menu = new Menu();
window.menu.drop();
window.menu.burguer();

cartOpen();

/* === scroll desktop === */
scrollCash();

/* === logic product pages === */
changeSelectValue();

/* === cards logic interaction === */
buttonChoices();
blurCard();

/* === logic interaction generals === */
sliderFunction();
sliderCarrousel();
/* eventRipple(); */
accordion();
listenerClickMenu();
openElementSibling();

/* ====== REDUX CODE ====== */
applyCode();

/* ====== filter FAQS ====== */
filterFaqs();

selectCountry();

/* ====== SUSCRIPTIONS GENERAlS ====== */
lazyImagesInscription();
intersectionByContainer('#resume-container', '#fixed-button-suscription');
intersectionByContainer('#index_stars-judgme', '#index_button-add');

/* CUSTOMER PORTAL SUSCRIPTIONS */
listenerFormsSuscriptions();
onChangeFrequencySelector();
onChangeInputSuscription();
resetDateInput();
clickDeleteSubs();
clickCloseBtnModal();

/* ====== Fetch API IP: Localization ====== */
geoFindMe();

/* API Translation */
window.localSave.save();

/* upsell checkout button */
loadCheckoutUpsellEvent();