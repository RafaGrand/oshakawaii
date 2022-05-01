import { currency } from "../currency/index.js";

// FETCH TEMPLATE ITEM CART MODAL
export const templatePack = ({ image, product_title, variant_title, title, quantity, variant_id, url, price }, index) => {
  let template = `<div variant_id="${variant_id}" class="item-cart-panda">
    <div class="img_item-cart">
      <img class="img-product" src="${image}" alt="panda cart ${title}" width="100" heigth="100" />
    </div>

    <div class="container-name-quantity">
      <div class="name-product-cart">
        <a href="${url}" title="${title}">
          <span class="name-item">
              ${product_title}
          </span>
          <span class="variant-item">
            ${variant_title}
          </span>
        </a>
      </div>

      <label class="quantity-cart-pack quantity-item-cart">
        <input data-set="${index}" class="input-cart-pack" variant_id="${variant_id}" value="${quantity}" type="number" min="0" max="999" pattern="[0-9]*" name="quantity" />
        <div class="quantity-nav">
          <button class="quantity-button quantity-down"></button>
          <button class="quantity-button quantity-up"></button>
        </div>
      </label>

    </div>

    <div class="remove-container-class">
      <span class="price-item-cart font-bold">${currency}${Number(price)/100}</span>
    </div>
  </div>`
  return template;
}

// FETCH TEMPLATE ITEM CART MODAL
export const templateDiference = ({ image, product_title, variant_title, title, quantity, variant_id, url, original_price }, index) => {
  let template = `<div variant_id="${variant_id}" class="item-diference-panda"> 
  
  <div class="img_item-cart-diference">
    <img class="img-product" src="${image}" alt="panda cart ${title}" width="100" heigth="100" />
  </div>

  <div class="container-name-quantity-diference">
    <a href="${url}" title="${title}">
      <span class="name_recomendation bold-font block-span">${product_title}</span>
      <span class="description_recomendation block-span">${variant_title} - ${currency}${Number(original_price)/100}</span>
    </a>
  </div>

  <button variant_id="${variant_id}" class="remove-diference-class">×</button>

  </div>`
  return template;
}