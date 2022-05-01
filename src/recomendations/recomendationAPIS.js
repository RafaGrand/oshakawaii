import { addCartSubmit } from "../cart/cart";
import { templateRecomendation } from "./template-recomendation";

// In this function make map to items in our car
const mapRecomendation = (list) => {
  let html = "";
  list.forEach((element, index) => {
    html += templateRecomendation(element, index) // make a "for" x item and plus variable html
  })
  addRecomendation(html);

}

const addRecomendation = (inner) => {
  const byAPI = document.getElementById("container-recomendation-api");

  byAPI.innerHTML = inner;
  addCartSubmit();

}

export const recomendationsRender = (recomedations) => {
  mapRecomendation(recomedations);
}