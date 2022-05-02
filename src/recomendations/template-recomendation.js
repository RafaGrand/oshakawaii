import { currency } from "../currency/index.js";
import { imgOptm } from "../utils/imageOptimization.js";

const checkDescriptionProduct = (description) => {
  let descriptionString = '';
  description.includes('[undertitle]') && (descriptionString = description.split("[undertitle]")[1].split("[/undertitle]")[0]);
  return descriptionString;
}

// FETCH TEMPLATE ITEM CART MODAL
export const templateRecomendation = ({ featured_image, description, title, price, url, variants, available, id }, index) => {
  
  let descriptionShort = description ? checkDescriptionProduct(description) : "";

  let textButton = "";

  let optImg = imgOptm(featured_image)
  
  textButton = available ? productStrings.addCartRecomendation + " - " + currency + price / 100 : productStrings.soldOut
  
  let template = `
  <li class="item-recomendations-cart">
    <div class="card-container recomendation-bg">
      <a class="url-card image-link-card" href="${url}" title="${title}">
        <div class="container-img-recomendation">
          <img
            class="card-img_product img-contain lazyload"
            data-src="${optImg}"
            alt="soru cart ${title}"
            width="100"
            heigth="100" />
        </div>
      </a>
      <div class="detail-card details-recomendations-card">
        <a class="url-card" href="${url}" title="${title}">
          <span class="name_recomendation bold-font">${title}</span><br/>
          <span class="description_recomendation">${descriptionShort}</span>
        </a>
      </div> 
      <div class="end-card container-btn-add">
        <form class="request-form" action="/cart/add">
          <input checked name="id" value="${variants[0].id}" type="hidden" />
          <button
            type="submit" 
            product_id="${id}" 
            class="btn_recomendation">
              ${textButton}
          </button>
        </form>
      </div>
    </div>
  </li>`
  return template;
}
