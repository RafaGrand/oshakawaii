import { checkCart, findIndex } from "../bundles/create-pack";
import { dataNew, requestAdd, updateAPI } from "../cart/cart";
import { cartItemsFetch } from "../services/fetchCart";
import { renderStorage, toConvertLocalStorage } from "../storage/renderStorage";
import { addProductSuscription, renderSuscriptionUI } from "./add-suscription";

/* CREATE NEW SUBSCRIPTION IN CART */
export function suscriptionButtons([quantity, id]) {
  let checked = document.querySelector('.frequency-input:checked');
  let price = document.querySelector(`.quantity-packing[variant-pack="${id}"]`).dataset.price;
  createSubscription (quantity, id, checked.value, checked.dataset.unit, price);
}

export function createSubscription (quantity, id, frequency, unitFrequency, price) {
  let properties = [frequency, unitFrequency];
  productSuscriptions = toConvertLocalStorage("suscription");

  priceListSuscriptions(id, price);
  addProductSuscription(quantity, id, productSuscriptions, frequency);
  checkCart(id)
    .then(rq => addSuscriptionToCart(rq, quantity, id, properties))
}

function priceListSuscriptions(id, price){
  let options ={};
  options[id]= price;
  localStorage.setItem("price", JSON.stringify(options));
}

function addSuscriptionToCart(existInCart, quantity, id, properties) {
  if(existInCart) {
    updateInSuscription(id, quantity, properties);
    dataNew();
  } else {
    requestAdd(id, quantity, properties);
  }
}

async function updateInSuscription(id, quantity, [frequency, unit_type]) {
  let index = await positionID(id);
  let propertiesSuscription = {"shipping_interval_frequency": frequency, "shipping_interval_unit_type": unit_type}
  index != -1 && updateAPI(index + 1, quantity, propertiesSuscription);
}

async function positionID (id) {
  try {
    const JSONCart = await cartItemsFetch();
    const index = await findIndex(JSONCart.items, id);
    return index;
  } catch(e) {
    console.error('Error:', err);
  }
}

/* ON LOAD PAGE - SUBSCRIPTION */
export function renderFirstSuscriptions() {
  productSuscriptions = toConvertLocalStorage("suscription");
  let frequenciesWithProducts = toConvertLocalStorage("frequencies");

  renderSuscriptionUI(frequenciesWithProducts);
  renderStorage(productSuscriptions);
}

export function openCartWithButtons() {
  const btns = document.querySelectorAll('.button-resume');
  btns.forEach(
    btn => {
      btn.addEventListener(
        'click',
        dataNew
      )
    }
  )
}

export function selectionFrequency() {
  const inputRadio = document.querySelectorAll('.frequency-input');
  
  inputRadio.forEach(e => {
    e.addEventListener(
      'change',
      function(e) {console.log(e);}
    )
  })
}
