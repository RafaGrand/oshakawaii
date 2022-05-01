
import { totalUpsell } from "../bundles/code-redux";
import { findElement, findIndex, itemsBundles } from "../bundles/create-pack";
import { addPlus } from "../quantity";
import { recomendationsRender } from "../recomendations/recomendationAPIS";
import { fetchPostAdd, cartItemsFetch, updateQuantity, recomendationsAPI } from "../services/fetchCart";
import { toConvertLocalStorage } from "../storage/renderStorage";
import { createSubscription } from "../suscriptions/index-suscriptions";
import { openModalCart, switchCheckoutUpsell } from "./open-close";
import { templateItemCart } from "./template-item";
import { totalCalcule } from "./total";

export const requestAdd = (id, quantity, properties) => {
  fetchPostAdd(id, quantity, properties)
    .then(() => itemsCart())
    .then(() => dataNew())
    .catch(err => console.error('Error:', err));
}

const requestAddRecomendation = (id, quantity) => {
  fetchPostAdd(id, quantity)
    .then(() => itemsCart())
    .catch(err => console.error('Error:', err));
}

export const dataNew = () => {
  let modalCart = document.getElementById("cart-side");
  let openCart = modalCart.getAttribute("open");
  /* animationPandaAdd(); */
  if(openCart === "true") return null;
  openModalCart(false, modalCart);
}

const dataItems = (items, dataLength) => {
  // Here save variables in DOM
  const containerCartt = document.getElementById("items-cartJS");
  const msgEmpty = document.getElementById("msg-empty-cart");
  const btnCheckout = document.getElementById("cart-sideButtons");

  const bySetting = document.getElementById("recomendations-by-setting");
  const byAPI = document.getElementById("recomendations-by-api");
  const itemsAPI = document.getElementById("container-recomendation-api");
  const modal = document.getElementById("cart-side");
  const apiRecommendationsQuantity = modal.getAttribute("data-api-recommendations-quantity");
  const checkoutUpsellBtn = document.querySelectorAll('.checkout_upsell__btn')

  // validate state items cart with length
  if(dataLength.length === 0) {
    bySetting.classList.remove("hidden");
    byAPI.classList.add("hidden");
    msgEmpty.classList.remove("hidden");
    btnCheckout.style.display = "none";
    containerCartt.innerHTML = "";
    itemsAPI.innerHTML = "";
  } else {
    bySetting.classList.add("hidden");
    byAPI.classList.remove("hidden");
    msgEmpty.classList.add("hidden");
    containerCartt.innerHTML = items;
    btnCheckout.style.display = "block";
    recomendationsAPI(dataLength[0].product_id, apiRecommendationsQuantity)
      .then(r => recomendationsRender(r.products))

    checkoutUpsellBtn.forEach(btn=>btn.addEventListener("click", async function() {
      btn.disabled = true;
      let variantId = btn.getAttribute("variant_id")
      console.log(variantId)
      try {
        requestAddRecomendation(variantId, 1)
      }catch(e) {
        console.error(e)
      }finally {
        btn.disabled = false
        btn.innerHTML = 'Produit ajouté!'
        location.href="/checkout"
      }
    }))
    
  }

  // functions to interactive items cart 
  quantityCart(".input-quantity");
  addPlus(".quantity-item");
}

const hasSuscription = (lineItems) => {
  let suscription = false;
  for (let e of lineItems) {
    if (e.properties != null) {
      if(e.properties.hasOwnProperty('shipping_interval_frequency')) {
        suscription = true
        break;
      }
    }
  }
  return suscription
}

const changeURL = (button, url) => {
  return button.querySelector('a').setAttribute('href', url)
}

const displayButtonRecharge = (cart, hasSuscription) => {
  let buttonRecharge = document.querySelector('#form-button-recharge');
  let buttonShopify = document.querySelector('#form-button-checkout');
  let buttonPageRC = document.querySelector('#rc-redirec-checkout');
  let discountPack = localStorage.getItem("codeRedux") ? localStorage.getItem("codeRedux") : '';
  
  if (hasSuscription) {
    buttonRecharge.classList.remove('hidden');
    changeURL(buttonRecharge, `https://checkout.rechargeapps.com/r/checkout?myshopify_domain=${Shopify.shop}&cart_token=${cart.token}&discount=${discountPack}`);
    buttonPageRC && changeURL(buttonPageRC, `https://checkout.rechargeapps.com/r/checkout?myshopify_domain=${Shopify.shop}&cart_token=${cart.token}&discount=${discountPack}`);
    buttonShopify.classList.add('hidden');
  } else {
    buttonRecharge.classList.add('hidden');
    changeURL(buttonRecharge, '');
    buttonShopify.classList.remove('hidden');
  }
}

// In this function make map to items in our car
const mapItemsCart = (list) => {
  let giftIdProfuct = document.getElementById("giftIdProfuct");
  let html = "";
  const itemsList = list.items;
  
  if(giftIdProfuct){
    let giftIdProfuctVAlue = parseInt(giftIdProfuct.value);
    const id_NUmber = parseInt(giftIdProfuctVAlue);
    itemsList.forEach((element, index) => {
      if (element.id !== id_NUmber) {
        html += templateItemCart(element, index);
      }
    })
    
    displayButtonRecharge(list, hasSuscription(itemsList));
    
    dataItems(html, itemsList);
    totalCalcule(list);
    totalUpsell(itemsList);

  } else{
    itemsList.forEach((element, index) => {
        html += templateItemCart(element, index);
    })
    
    displayButtonRecharge(list, hasSuscription(itemsList));
    
    dataItems(html, itemsList);
    totalCalcule(list);
    totalUpsell(itemsList);
  }

}

export function itemsCart() {
  cartItemsFetch()
    .then(dataRes => mapItemsCart(dataRes)) // process data items
    .catch(err => console.error('Error:', err));
}

const changeValuePck = (value, change, change2) => {
  change && (change.value = value);
  change2 && (change2.value = value);
}

const validateCartPack = (id, value) => {

  const cartSide = document.getElementById("side-bundle-pack");
  const changeValue = document.querySelector(`.input-quantity-pack[variant-pack="${id}"]`);
  const changeValue2 = document.querySelector(`.input-cart-pack[variant_id="${id}"]`);
  
  findElement(productPacks, id, value);

  localStorage.setItem("pack", JSON.stringify(productPacks));

  cartSide && changeValuePck(value, changeValue, changeValue2);

}

export function displayAnimation(containerItems) {
  let containerBundle = document.getElementById(containerItems);
  containerBundle.innerHTML = `<div class="wrapper-loader"><div class="spinner-loader"></div></div>`;
}

export function updateAPI(line, quantity, properties) {
  updateQuantity(line, quantity, properties)
    .then(dataRes => mapItemsCart(dataRes))
    .then(() => itemsBundles())
    .catch(err => console.error('Error:', err));
} 

// this function to change quantity in cart drawer
export function quantityCart(targets) {
  const inputChange = document.querySelectorAll(targets);

  for (let input of inputChange) {
    input.addEventListener("change", function(e) {
      
      //Important comment for change of type of call to API line / id
      // const line = Number(e.target.dataset.set) + 1;
      let valueChange = Number(e.target.value);
      let id = e.target.getAttribute("variant_id");

      let idUntil = parseInt(id);
      
      /* displayAnimation('items-cartJS'); */
      updateAPI(idUntil, valueChange);
      
      validateSubscriptions(Number(id), valueChange);
      validateCartPack(Number(id), valueChange);
      
    })
  }
}

function validateSubscriptions(id, value) {
  let cartSubscription = toConvertLocalStorage("suscription");
  let i = findIndex(cartSubscription, id);

  updateSubscriptionsCart(i, cartSubscription, id, value);
  checkQuantityInputSubscription(id, value);
}

function updateSubscriptionsCart (i, cartSubscription, id, value) {
  if(i != -1) {
    let frequencySubscription = cartSubscription[i].frequency;
    let checked = document.querySelector('.frequency-input:checked');
    let unit = checked ? checked.dataset.unit : 'month';
    createSubscription(value, id, frequencySubscription, unit);
  }
}

function checkQuantityInputSubscription(id, quantity) {
  let target = document.querySelector(`.quantity-packing[variant-pack="${id}"]`);
  target && (target.innerText = quantity);
}

// EVENT SUBMIT CART
export const submitEvent = (e) => {
  e.preventDefault();
  const eTarget = e.target;
  const btnSubmit = eTarget.dataset.form; // to check button submitter
  let idForm = "";
  
  for (let target of eTarget) {
    target.checked === true && (idForm = target.value);
  }

  if(eTarget.getAttribute('origin-form') === 'checkout') {
    fetchPostAdd(idForm, 1)
      .then(() => {
        const sideCart = document.querySelector('#cart-side');
        const shopifyForm = document.querySelector('#form-button-checkout');
        const rechargeCheckout = document.querySelector('#form-button-recharge a');

        if(sideCart.getAttribute('data-checkout') === 'shopify' ) {
          shopifyForm.submit();
        } else {
          rechargeCheckout.click();
        }
      })
      .catch(err => console.error(err))
    return;
  }
  
  btnSubmit === "classic-form" ? requestAdd(idForm, 1) : requestAddRecomendation(idForm, 1);
}

// event button add cart
export function addCartSubmit() {
  const formAddCart = document.querySelectorAll(".request-form");
  for (let submit of formAddCart) {
    submit.addEventListener("submit", submitEvent)
  }
}


/**
 * This function load the click event for checkout button
 * @returns void
 * @author Williams Montes de oca <williams.oca@gradiweb.com>
 */
export function loadCheckoutUpsellEvent() {
  const checkoutBtnUpsell = document.querySelector('.btn-step-checkout-upsell');

  if(!checkoutBtnUpsell) return;

  checkoutBtnUpsell.addEventListener("click", () => {
    let modalCart = document.getElementById("cart-side");

    switchCheckoutUpsell(modalCart);
  })
}