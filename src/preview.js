import { submitEvent } from "./cart/cart";
import { NewProduct } from "./preview-product/add-product";
import { clickPreviewModal, modaClosePrev } from "./preview-product/index-preview";

clickPreviewModal();
modaClosePrev();

NewProduct.prototype.addIn = function(id) {
  const formAddCart = document.querySelector(id);
  formAddCart.addEventListener("submit", submitEvent)
}