import { geoFindMe } from "../geolocal";

// EVENT MODAL TO OPEN CART
export const openModalCart = (overlay, modal) => {

  // When checkout modal
  if(modal.getAttribute('data-checkout-upsell') === 'true') {
    switchCheckoutUpsell(modal, true);

    modal.setAttribute('data-checkout-upsell', false);
    return;
  }

  { modal.getAttribute('open') === "true" ?
    (
      overlay && (overlay.style.display = "none"),
      modal.style.animation = "animationCartOut 0.3s ease-in-out forwards",
      document.body.dataset.cart = 'close',
      modal.setAttribute('open', 'false')
    ) :
    (
      overlay && (overlay.style.display = "block"),
      modal.style.animation = "animationCartIn 0.3s ease-in-out forwards",
      document.body.dataset.cart = 'open',
      modal.setAttribute('open', 'true')
    )
  }
}

// cart modal close/open
export function cartOpen() {
  let cartOpen = document.getElementById("cart_btn");
  let btnClose = document.getElementById("close-cart");
  let btnCloseUpsell = document.getElementById("close-cart-upsell");
  let btnReturn = document.querySelector(".btn-return-upsell-cart");
  let modalCart = document.getElementById("cart-side");

  btnClose.addEventListener("click", function() {
    openModalCart(false, modalCart);
  })

  btnCloseUpsell.addEventListener("click", function() {
    openModalCart(false, modalCart);
  })

  btnReturn.addEventListener("click", function() {
    openModalCart(false, modalCart);
  })

  
  cartOpen.addEventListener("click", function() {
    openModalCart(false, modalCart);
  })
}

/**
 * Show/hide checkout upsell elements in sidecart
 * @param {nodeElement} modal 
 * @param {boolean} invert 
 * @author Williams Montes de oca <williams.oca@gradiweb.com>
 * @returns void
 */
export const switchCheckoutUpsell = (modal, invert) => {
  const byAPI = document.getElementById("recomendations-by-api");
  let elements = [
    ['.cart-title-slide', true],
    ['#items-cartJS', true],
    ['#recomendations-by-setting', true],
    ['#recomendations-by-api', true],
    ['.btn-step-checkout-upsell', true],
    ['.checkout-step-upsell-recomendations', false],
    ['.checkout-upsell-text', false],
    ['#form-button-checkout .btn-checkout', false],
    ['#form-button-recharge .btn-checkout', false],
    ['.btn-return-upsell-cart', false],
    ['.cart-title-upsell', false],
    ['.close-cart-upsell', false],
    ['.close-cart-side', true]
  ];

  if(invert) {
    for(const key in elements) {
      elements[key][1] = !elements[key][1];
    }
  }

  for(const element of elements) {
    const selectedElement = modal.querySelector(element[0]);
    if(!selectedElement) continue;

    if(element[1]) {
      selectedElement.classList.add('hidden');
      byAPI.style.display ='none';
    } else {
      selectedElement.classList.remove('hidden');
      byAPI.style.display ='block';
    }
  }

  modal.setAttribute('data-checkout-upsell', true);
}