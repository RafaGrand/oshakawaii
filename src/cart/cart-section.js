import axios from "axios";
import { applyCode } from "../bundles/code-redux";
import { addPlus } from "../quantity";
import { updateQuantity } from "../services/fetchCart";
import { itemsCart } from "./cart";

const fetchCart = async () => {
  const request = await axios(`/cart?section_id=${cart_section}`);
  return request.data;
}

const innerCart = (cartHtml) => {
  const containerCart = document.getElementById(`shopify-section-${cart_section}`);
  containerCart.innerHTML = cartHtml;
}

export const removeProductCart = () => {
 const removeBtn = document.querySelectorAll(".remove-button_page");
 for (let remove of removeBtn) {
   remove.addEventListener("click", (e) => {
      const target = e.target;
      const variantId = target.getAttribute("variant_id");  
      const input = document.querySelector(`.input-cart-page[variant_id="${variantId}"]`);
      input.value = 0;
      input.dispatchEvent(new Event("change"));
   })
 }
}

export function quantityCartPage() {
  const inputChange = document.querySelectorAll(".input-cart-page");

  for (let input of inputChange) {
    input.addEventListener("change", function(e) {
      
      //Important comment for change of type of call to API line / id
      // const line = Number(e.target.dataset.set); 
      let valueChange = Number(e.target.value);
      let id = e.target.getAttribute("variant_id");
  
      updateQuantity(id, valueChange)
        .then(() => fetchCart())
        .then(inner => innerCart(inner))
        .then(() => {
          itemsCart();
          quantityCartPage();
          addPlus(".quantity-item-page");
          applyCode(codeRedux);
          removeProductCart();
        })
        .catch(err => console.error('Error:', err));
      
      /* validateCartPack(Number(id), valueChange); */
      
    })
  }
}