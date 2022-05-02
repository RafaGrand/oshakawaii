import { displayAnimation, itemsCart } from "../cart/cart";
import { openModalCart } from "../cart/open-close";
import { addPlus } from "../quantity";
import { cartItemsFetch, fetchPostAdd } from "../services/fetchCart";
import { renderStorage } from "../storage/renderStorage";
import { templateDiference, templatePack } from "./template-pack";
import { totalizeSidePack } from "./total-pack";

export function renderFirst() {

  productPacks = localStorage.getItem('pack') 
    ? JSON.parse(localStorage.getItem('pack')) 
    : [];

  itemsBundles();
  messagesCallTo(productPacks);
  renderStorage(productPacks);
}

export const checkCart = (id) => {
  const JSONCart = cartItemsFetch()
  return JSONCart
    .then(data => someId(data.items, id))
    .catch(err => console.error('Error:', err));
}

// this function have two parametres: ARRAY WITH PRODUCT ITEM and ID
export const someId = (objCheck, id) => {
  const request = objCheck.some(obj => obj.id === id); // RETURN BOOLEAN
  return request;
}

export const findIndex = (object, value) => {
  const indexValue = object.findIndex(i => i.id == value);
  return indexValue;
}

export const findElement = (object, value, quantity) => {
  /* const indexValue = object.findIndex(i => i.id == value); */
  const indexValue = findIndex(object, value);

  indexValue != -1 && (
    object[indexValue].quantity = quantity,
    quantity === 0 && object.splice(indexValue, 1)
  )
}

export const compareObje = (ob1, ob2) => {
  // COMMON items OBJECT
  const resultCommon = ob1.filter(item1 => ob2.find(item2 => item2.id === item1.id));
  
  // DIFERENCE items OBJECT
  const resultDiference = ob1.filter(item1 => !ob2.some(item2 => item2.id === item1.id));

  // SAVE OBJECT COMPARE 
  let compareResult = {common: resultCommon, diference: resultDiference}

  return compareResult;
}

const eachMapList = (container, array, functionTemplate) => {
   // variable to insert html strings DOM
  let html = "";

  array.forEach((element, index) => {
    html += functionTemplate(element, index)
  });

  container && (container.innerHTML = html)
}

const renderProductInPack = (common) => {
  const containerItemsBundle = document.getElementById("items-bundle-cart");
  const contianerEmptyMessage = document.getElementById("empty-box-message");

  if(common.length === 0) {
    containerItemsBundle && (containerItemsBundle.innerHTML = '');
    contianerEmptyMessage && contianerEmptyMessage.classList.remove('hidden');
  } else {
    eachMapList(containerItemsBundle, common, templatePack);
    contianerEmptyMessage && contianerEmptyMessage.classList.add('hidden');
  }
}

const renderListBundle = ({common, diference}) => {
  
  const containerItemsDiference = document.getElementById("items-other-products");
  
  renderProductInPack(common);

  eachMapList(containerItemsDiference, diference, templateDiference);

  addPlus(".quantity-cart-pack");
  onChangeCartSide();
  /* removeProductPack(); */
  removeItemDiference();
  totalizeSidePack(common, diference);

}

// Function to remove item product with X
/* function removeProductPack() {
  const removeBtn = document.querySelectorAll('.remove-button-pack');
  
  for (let remove of removeBtn) {
    remove.addEventListener(
      'click',
      function(e) {
        let targetButton = e.target;
        let id = targetButton.getAttribute('variant_id'); 
        let inputChange = document.querySelector(`.input-cart-pack[variant_id='${id}']`);
        inputChange.value = 0;
        inputChange.dispatchEvent(new Event('change'));
      }
    )
  }

} */

function removeItemDiference() {
  const removeBtn = document.querySelectorAll('.remove-diference-class');
  
  for (let remove of removeBtn) {
    remove.addEventListener(
      'click',
      function(e) {
        let targetButton = e.target;
        let id = targetButton.getAttribute('variant_id'); 
        let inputChange = document.querySelector(`.input-quantity[variant_id='${id}']`);
        inputChange.value = 0;
        inputChange.dispatchEvent(new Event('change'));
      }
    )
  }

}

export const itemsBundles = () => {
  cartItemsFetch()
    .then(data => compareObje(data.items, productPacks))
    .then(itemsPack => renderListBundle(itemsPack))
}

const soruUI = (quantity, maxCount) => {
  let soru = '';
  const countContainer = document.getElementById('soru-pack-count');

  let count = maxCount === 0 ? 1 : maxCount;
  
  if(quantity >= maxCount) {

    for (let i = 0; i < (count); i++) soru += `<div class='contianer-soru-icon limit-soru' style="z-index: ${count - i}"></div>`;

  } else {

    for (let i = 0; i < (quantity + 1); i++) soru += `<div class='contianer-soru-icon' style="z-index: ${(quantity + 1) - i}"></div>`;

  }

  countContainer && (countContainer.innerHTML = soru);
}

function validateIteration(message, message2, maxCount, quantity) {
  const messageDOM = document.getElementById('message-bar-pack');
  const messageSIDE = document.getElementById('side-message-pack');
  
  messageDOM && (messageDOM.innerHTML = message);
  messageSIDE && (messageSIDE.innerHTML = message2);
 
  soruUI(quantity, maxCount);
  
}

function searchDiscount(arr, numberDiscount) {
  const discountKeys = Object.keys(arr).map(e => parseInt(e));
  const index = discountKeys.indexOf(numberDiscount);
  if(index > -1) return discountKeys[index];
  if(numberDiscount < 0) return null;
  return searchDiscount(arr, numberDiscount - 1);
}

export function iterationInDiscount(numberQuantity, objective) {
  return discount[searchDiscount(discount, numberQuantity)][objective];
}

function messagesCallTo(array) {

  let qq = 0;
  let pd = numberProductsPacks.length > 0
    ? Math.max(...numberProductsPacks)
    : 0;

  for (let q of array) {
    qq += q.quantity
  }

  /* // valuate if quantity is > to length array discount ?
  qq >= Object.keys(discount).length && (qq = Object.keys(discount).length) */

  let iterar = {
    bar: iterationInDiscount(qq, 1),
    side: iterationInDiscount(qq, 2),
    maxProduct: pd
  }
  
  validateIteration(iterar.bar, iterar.side, iterar.maxProduct, qq);

}

export const changeValueInCartJS = (value, id) => {
  let change = document.querySelector(`.input-quantity[variant_id='${id}']`);
  if(change) {
    change.value = value;
    change.dispatchEvent(new Event('change'));
  }
}

const onChangeCartSide = () => {

  const inputCartPack = document.querySelectorAll('.input-cart-pack');

  for (let input of inputCartPack) {

    input.addEventListener(
      'change',
      (e) => {
        let target = e.target;
        let id = target.getAttribute('variant_id');
        let change = document.querySelector(`.quantity-packing[variant-pack='${id}']`);
        change.innerText = target.value;
        
        pushInBundle([Number(target.value), Number(id)]);
      }
    );

  }
}

const updateCartSide = (haveCart, quantity, variantId) => {
  displayAnimation('items-bundle-cart');
  if(haveCart) {

    changeValueInCartJS(quantity, variantId);
    newProductPack();

  }else {

    fetchPostAdd(variantId, quantity)
      .then(() => itemsCart())
      .then(() => itemsBundles())
      .then(() => newProductPack())
      .catch(err => console.error('Error:', err));

  }
}

const newProductPack = () => {

  let modalCart = document.getElementById('side-bundle-pack');
  let overlay = document.getElementById('overlay');

  let attrOpen = modalCart.getAttribute('open');
  attrOpen === 'false' && openModalCart(overlay, modalCart);
}

export function pushInBundle([quantity, variantId])  {
  
  const rqt = someId(productPacks, variantId);

  !rqt 
    ? productPacks.push({id: variantId, quantity: quantity})
    : findElement(productPacks, variantId, quantity);

  localStorage.setItem("pack", JSON.stringify(productPacks));
  
  messagesCallTo(productPacks);

  checkCart(variantId)
    .then(rq => updateCartSide(rq, quantity, variantId))
}
