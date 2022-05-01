import { applyCode } from "./code-redux";
import { iterationInDiscount } from "./create-pack"
import { currency } from "../currency/index.js";

function addCheckout(code) {
  localStorage.setItem("codeRedux", code);
  codeRedux = localStorage.getItem("codeRedux")
  applyCode();
}

function saveDiscount(discount) {
  localStorage.setItem("discountPack", discount);
}

const insertDomTotal = (totalObject) => {
  // get container DOM to remplace values
  const packBoxTotal = document.getElementById("total-pack-box");
  const totalBoxCart = document.getElementById("total-cart-pack");

  if(totalObject.discountTotal != 0) {
    
    packBoxTotal.innerHTML = `
      <span class="discount-total">${totalObject.currencySymbol}${((totalObject.totalPack)).toFixed(2)}</span>
      <span class="total-item-price total-text">${totalObject.currencySymbol}${((totalObject.totalPack * (1 - (totalObject.discountTotal)/100))).toFixed(2)}</span>
    `;

    totalBoxCart.innerHTML = `
      <span class="discount-total">${totalObject.currencySymbol}${(totalObject.sumTotals).toFixed(2)}</span>
      <span class="total-item-price total-text">${totalObject.currencySymbol}${(((totalObject.totalPack * (1 - (totalObject.discountTotal)/100)) + totalObject.totalCart)).toFixed(2)}</span>
    `;

  } else {
    
    packBoxTotal.innerHTML = `
      <span class="total-item-price total-text">${totalObject.currencySymbol}${(totalObject.totalPack).toFixed(2)}</span>
    `;
    totalBoxCart.innerHTML = `
      <span class="total-item-price total-text">${totalObject.currencySymbol}${(totalObject.sumTotals).toFixed(2)}</span>
    `;

  }
  
}

const calculateTotalPack = (totalPack, totalCart, quantity) => {
  
  if(numberProductsPacks != undefined) {
    
    let totalObject = {
      currencySymbol: currency,
      totalPack: totalPack / 100,
      totalCart: totalCart / 100,
      discountTotal: iterationInDiscount(quantity, 0),
      sumTotals: (totalPack + totalCart) / 100
    }

    insertDomTotal(totalObject);

    saveDiscount(totalObject.discountTotal);
    addCheckout(iterationInDiscount(quantity, 3));
  }
}

function iterationQuantity(itarate) {
  let total = 0;
  let quantity = 0;

  for (let i of itarate) {
    total += i.price * i.quantity;
    quantity += i.quantity;
  }

  return [total, quantity];
}

export const totalizeSidePack = (objectPack, objectDiference) => {

  // declare variables with iteration mutation values
  let boxTotal = {};

  // this objects return props cart item

  let totalPack = iterationQuantity(objectPack)[0];
  let totalCart = iterationQuantity(objectDiference)[0];
  let quantity = iterationQuantity(objectPack)[1];

  calculateTotalPack(totalPack, totalCart, quantity);
  
  /* // valuate if quantity is > to length array discount ?
  quantity >= Object.keys(discount).length && (quantity = Object.keys(discount).length) */


  boxTotal = {pack: (Number(totalPack) / 100).toFixed(2), cart: (Number(totalCart) / 100).toFixed(2)}
  return boxTotal;
}