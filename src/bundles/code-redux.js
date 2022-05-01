import { compareObje } from "./create-pack";
import { totalizeSidePack } from "./total-pack";
import { currency } from "../currency/index.js";

export const applyCode = () => {
  codeRedux = localStorage.getItem("codeRedux");

  const btnCheckout = document.querySelectorAll(".discount-checkout-form");
  const upsellBtn = document.getElementById("checkout-upsell");

  upsellBtn && (upsellBtn.value = codeRedux);
  for (let checkout of btnCheckout) {
    checkout.value = codeRedux;
  }
}

const dataTotal = ({common, diference}) => {
  let containerTotal = document.getElementById("total-pack-upsell");
  let objectTotalize = totalizeSidePack(common, diference);
  let discount = localStorage.getItem("discountPack");
  
  let totalize = (Number(objectTotalize.pack) * (1 - (Number(discount) / 100))) + Number(objectTotalize.cart);
  
  containerTotal && (containerTotal.innerHTML = `${currency}${totalize.toFixed(2)}`);
}

export const totalUpsell = (cartItems) => {
  productPacks = localStorage.getItem("pack") ? JSON.parse(localStorage.getItem("pack")) : [];
  let compareValues = compareObje(cartItems, productPacks);

  dataTotal(compareValues);
}