import { currency } from "../currency/index.js";
import { imgOptm } from "../utils/imageOptimization.js";
import { getVariantData } from "../utils/productData.js";
import { templatePrice } from "./templatePrice.js";

function validationProperties(properties, original_price, final_price, id) {
  if (properties !== null) {
    if (Object.keys(properties).length > 0) {
      let info = renderSubscriptionInfo(properties);
      let newPrices = renderPriceDiscount(original_price, final_price, id)
      return [info, newPrices, `— ${suscriptionSchema.subscription}`];
    }
  } else {
    null;
  }
}

function renderSubscriptionInfo(properties) {
  let object = Object.values(properties);
  return `${suscriptionSchema.assambly2} ${object[0]} ${suscriptionSchema.frequency_unit}`;
}

const valueCurrency = (code, number) => code + '' + (Number(number)/100).toFixed(2)
const priceRender = (code, number) => code + '' + (Number(number)).toFixed(2)

function renderPriceDiscount(original_price, final_price, id) {
  let prices = JSON.parse(sessionStorage.getItem("price"));
  let priceQuery = prices ? Number(prices[id]) : null;
  let final = valueCurrency(currency, final_price);
  let original = priceQuery ? valueCurrency(currency, priceQuery) : final;

  if (original != final) {
    return templatePrice(valueCurrency(currency, original_price), original);
  } else {
    if (final_price === original_price) return templatePrice(original);
    return templatePrice(final, original);
  }
}

function pricesProductEntity (variantId) {
  const { compare_at_price, price } = getVariantData(variantId);
  const compareWithCurrency = priceRender(currency, compare_at_price);
  const priceWithCurrency = priceRender(currency, price);

  return (
    compare_at_price
      ? templatePrice(priceWithCurrency, compareWithCurrency)
      : templatePrice(priceWithCurrency)
  )
}

export const templateItemCart = ({
  image,
  product_title,
  variant_title,
  title,
  quantity,
  variant_id,
  url,
  original_price,
  price,
  final_price,
  properties }, index) => {

  let haveProperties = validationProperties(properties, original_price, price, variant_id);
  let haveDiscount = final_price === original_price ? false : true;

  let newProperties = haveProperties
    ? haveProperties[0]
    : "";

  let newPrice = haveProperties
    ? haveProperties[1]
    : haveDiscount 
      ? templatePrice(valueCurrency(currency, final_price), valueCurrency(currency, original_price))
      : pricesProductEntity(variant_id)

  let subscription_badge = haveProperties
    ? haveProperties[2]
    : "";

  let optImage = imgOptm(image);

  let template = `<div variant_id="${variant_id}" class="item-cart-panda">
    <div class="img_item-cart">
      <img class="img-product" src="${optImage}" alt="panda cart ${title}" width="100" heigth="100" />
    </div>

    <div class="container-name-quantity">
      <div class="name-product-cart">
        <a href="${title.includes("Auto renew") ? '#' : url}" title="${title}">
          <span class="suscription-product_title">
            <span class="uppercase font-bold size-product_cart">${product_title.includes("Auto renew") ? product_title.replace("Auto renew", "") : product_title}</span> ${subscription_badge}
          </span>
          <span class="variant-item">
            ${variant_title} ${newProperties}
          </span>
        </a>
      </div>

      <label class="quantity-item quantity-item-cart">
        <input data-set="${index}" class="input-quantity" variant_id="${variant_id}" value="${quantity}" type="number" min="0" max="999" pattern="[0-9]*" name="quantity" />
        <div class="quantity-nav">
          <button class="quantity-button quantity-down test"></button>
          <button class="quantity-button quantity-up"></button>
        </div>
      </label>

    </div>

    <div class="remove-container-class">
      <span class="price-item-cart">
        <span class="money">${newPrice}</span>
      </span>
    </div>
  </div>`
  return template;
}