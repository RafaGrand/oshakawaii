import { addCartSubmit } from "../cart/cart";
import { buttonChoices } from "../index-product";
import { recomendationsProduct } from "../services/fetchRecomendations";

function logicProductCard() {
  addCartSubmit();
  buttonChoices();
};

export const renderRecomendations = () => {
  const containerInner = document.getElementById("recommended-shopify");

  recomendationsProduct()
    .then(textLiquid => {
      if (textLiquid.trim() === '') return;
      containerInner.innerHTML = textLiquid;
    })
    .then(()=> logicProductCard());
};