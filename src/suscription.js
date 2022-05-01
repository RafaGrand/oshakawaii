import { detectButtonsQuantity, suscriptionButtonPreview } from "./bundles/quantity-buttons";
import { NewProduct, submitProductPreview } from "./preview-product/add-product";
import { clickPreviewModal, modaClosePrev } from "./preview-product/index-preview";
import { openCartWithButtons, renderFirstSuscriptions, selectionFrequency, suscriptionButtons } from "./suscriptions/index-suscriptions";

detectButtonsQuantity(suscriptionButtons);
selectionFrequency();
renderFirstSuscriptions();
openCartWithButtons();

clickPreviewModal();
modaClosePrev();

NewProduct.prototype.addIn = function(id) {
  const formAddCart = document.querySelector(id);
  formAddCart.addEventListener(
    "submit",
    function(e) {
      submitProductPreview(e, suscriptionButtonPreview)
    }
  )
}