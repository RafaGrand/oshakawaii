import { comparationEventsQuantity } from "../bundles/quantity-buttons";

// EVENT SUBMIT CART
export const submitProductPreview = (e, effect) => {
  e.preventDefault();
  const eTarget = e.target;
  let containerTarget = document.querySelector(`.quantity-packing[product-pack="${eTarget.dataset.product}"]`);
  let oldValue = parseFloat(containerTarget.innerText);
  effect('plus', containerTarget, oldValue)
}

export function NewProduct() {}

NewProduct.prototype.addIn = function(id) {
  const formAddCart = document.querySelector(id);
  formAddCart.addEventListener(
    "submit",
    function(e) {
      submitProductPreview(e, comparationEventsQuantity)
    }
  )
}


