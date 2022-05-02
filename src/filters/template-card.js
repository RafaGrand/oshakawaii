import { currency } from "../currency/index.js"

const templateRadioVariants = ({ available, public_title, price, compare_at_price, id }, index) => {
  let disabled
  let radioCheck
  let textSoldOut
  let check
      
  let comparePrice = compare_at_price ? 
    `<span class="line-trg">
      - ${currency + (compare_at_price / 100).toFixed(2)}
    </span>` : ""
  
  available ?
    (
      disabled = "",
      radioCheck = `<div style="width: 10px; height: 10px;" class="rad-design"></div>`,
      textSoldOut = ""
    ) :
    (
      disabled = `disabled="disabled"`,
      radioCheck = `<svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5.21143" r="4.5" stroke="black"/>
      <path d="M2 2.21143L8 8.21143" stroke="black"/>
      </svg>`,
      textSoldOut = productStrings.soldOut
    )
      
  index === 0 && (check = "checked")

  let template = `
  <label class="rad-label" style="color: #989898;">

    <input
      ${disabled}
      class="rad-input"
      id_prod=""
      ${check}
      type="radio" 
      name="id" 
      value="${id}" />

      ${radioCheck}
    

    <div class="rad-text">

      ${textSoldOut}
      ${public_title}
      
      <span>
        <span>${price}</span>
        ${comparePrice}

      </span>
    </div>

  </label>`;

  return template;
}



// FETCH TEMPLATE PRODUCT CARD
export const templateCardProduct = ({ featured_image, description, title, price, handle, variants, available, id, images, compare_at_price, tags }, index) => {
  
  let descriptionShort = description.split("[undertitle]")[1].split("[/undertitle]")[0];
  
  let lastImage = images[images.length - 1];
  
  let variantsNon
  let radiOn
  let addChoices

  let disabled
  let addCart
  let sold

  let comparePrice = compare_at_price ? currency + (compare_at_price / 100).toFixed(2) : ""

  let tagsCard = tags.find(e => e.split("-")[0] === "card");
  let tagsRender = tagsCard ? tagsCard.split("-")[1] : "";

  available ?
    (
      disabled = "",
      addCart = "",
      sold = "hide"
    ) :
    (
      disabled = `disabled="disabled"`,
      addCart = "hide",
      sold = ""
    )
  
  variants.length > 1 ?
    (
      variantsNon = "variants-non",
      radiOn = "radio-on",
      addChoices = `
      <button type="button" class="soru-btn btn-choices-card btn-choices btn-animation">
        Choisir format
      </button>`
    ) :
    (
      variantsNon = "",
      radiOn = "radio-non",
      addChoices = ""
    )
  
  let variantsRadio = "";

  variants.forEach((element, i) => {
    variantsRadio += templateRadioVariants(element, i)
  });

  let template = `
  <li class="item-collection-product">
    <div class="bg_card card_product-bg">
      <a href="/products/${handle}" title="${title}">
        <div class="images-loop">
          
          <div class="image-card_back card-img_product lazyload" style="background-image: url('${lastImage}')"></div>
          <div class="image-card_top card-img_product lazyload" style="background-image: url('${featured_image}')"></div>

          <div class="tag-objective">
                
            <span class="color-tag_${tagsRender}">${tagsRender}</span>

          </div>
          
        </div>
      </a>
      <div class="details-product-card">
        <a href="/products/${handle}" title="${title}">
          <span class="name_product bold-font">${title}</span><br/>
          <span class="description_product">${descriptionShort}</span>
          <div class="section-price-product">
            <span product_id='${id}' class="price_normal price_product bold-font">${currency + (price / 100).toFixed(2)}</span>
            <span product_id='${id}' class="price_compare price_product bold-font line-thr">${comparePrice}</span>
          </div>
        </a>
      </div> 
      <div class="form-add-product">
        <form class="request-form" action="/cart/add">

          ${addChoices}
          
          <div class="${variantsNon}">
            <div class="border-select-variant ss ${radiOn}">
              ${variantsRadio}
            </div>

            <div class="container-button-products">
              <button
                ${disabled}
                type="submit" 
                product_id="${id}" 
                class="soru-btn btn-card-main btn-add-card btn-animation">
                
                <span product_id="${id}" class="class-sold ${sold}">
                  ${productStrings.soldOut}
                </span>
                <span product_id="${id}" class="class-add ${addCart}">
                  ${productStrings.addCart}
                </span>
              
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </li>`
  return template;
}
