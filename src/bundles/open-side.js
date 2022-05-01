import { openModalCart } from "../cart/open-close";

// cart modal close/open
export function cartPackSide() {
  let cartOpen = document.getElementById("bar-coffret");
  let btnClose = document.getElementById("close-side-bundle");
  let modalCart = document.getElementById("side-bundle-pack");
  let overlay = document.getElementById("overlay");

  btnClose && btnClose.addEventListener(
    "click",
    function() {
    openModalCart(overlay, modalCart);
  })

  cartOpen && cartOpen.addEventListener(
    "click",
    function() {
    openModalCart(overlay, modalCart);
  })

}