import { currency } from "../currency/index.js";
import { cartItemsFetch ,giftProduct,validateProductdelete } from "../services/fetchCart.js";


export const totalCalcule = (e) => {
  let giftIdProduct = document.getElementById("giftIdProfuct");
  innerTotal(e.original_total_price);
  livrasonBarProgress(e);
  if (giftIdProduct) {
    let giftIdProfuctValue = parseInt(giftIdProduct.value);
    const id_NUmber = parseInt(giftIdProfuctValue);
      
    cartItemsFetch()
    .then(dataRes => itemCount(dataRes,id_NUmber,e.item_count)) 
    .catch(err => console.error('Error:', err));
  } else {
        
    cartItemsFetch()
    .then(dataRes => itemCount(dataRes,null,e.item_count)) 
    .catch(err => console.error('Error:', err));
  }
}

function innerTotal (total) {
  const totalContainer = document.querySelectorAll(".total-cart-items");
  totalContainer.forEach(
    container => {
      container.innerText = `${currency}${total/100}`;
    }
  )
}

function livrasonBarProgress (dataCart) {
  const livrasonBar = document.getElementById("livrason-bar");
  livrasonBar.value = dataCart.original_total_price/100;
  
  innerTextLivrason(dataCart, livrasonBar);
}

function innerTextLivrason (e, livrasonBar) {
  let valueGetShippingFree = document.getElementById("rest-text-shipping");
  let priceShippingContainer = document.getElementById("total-shipping-cart"); 
  
  let freeShippingMessage1 = document.getElementById("free-shipping-1");
  let freeShippingMessage2 = document.getElementById("free-shipping-2");
  
  let price = livrasonBar.getAttribute("price");
  
  let priceShipping = validationShippingCountry();
  let difference = calculeDiference(price, e.original_total_price/100);

  let cadeauAmount = document.getElementById('cadeau-amount');
  let differenceGift = calculeDiference(cadeauAmount.value, e.original_total_price/100);

  
  if(difference < 0) {
    valueGetShippingFree.innerText = "";
    priceShippingContainer.innerHTML = themeStrings.freeShippingShort;
    freeShippingMessage1.innerText = "";
    freeShippingMessage2.innerText = "";
   
  } else {
    valueGetShippingFree.innerText = ` ${currency}${difference.toFixed(2)} `;
    priceShippingContainer.innerHTML = priceShipping;
    freeShippingMessage1.innerText = themeStrings.freeShippingPart1;
    freeShippingMessage2.innerText = themeStrings.freeShippingPart2;
  }

    
  let freeGiftMessage1 = document.getElementById("free-gift-1");
  let freeGiftMessage2 = document.getElementById("free-gift-2");
  let valueGetGiftFree = document.getElementById("rest-text-gift");
  let priceGiftContainer = document.getElementById("total-gift-cart"); 
  let barProgressGift = document.getElementById("bar-progress-gift"); 
  let giftTotal = document.getElementById("gift-total"); 
  
  if (differenceGift < 0 && cadeauAmount.value != 5) {
    giftTotal.classList.remove('hidden');
    barProgressGift.classList.remove('hidden');
    freeGiftMessage1.innerText = "";
    freeGiftMessage2.innerText = "";
    valueGetGiftFree.innerText = "";
    priceGiftContainer.innerHTML = "Ajouter";
    let giftIdProfuct = document.getElementById("giftIdProfuct")
    let giftIdProfuctVAlue = parseInt(giftIdProfuct.value) 
    const id_NUmber = parseInt(giftIdProfuctVAlue);
    giftProduct(id_NUmber,1)

  } else {
    if (cadeauAmount.value == 5) {
      giftTotal.classList.add('hidden');
      barProgressGift.classList.add('hidden');
      
    } else {
      giftTotal.classList.remove('hidden');
      barProgressGift.classList.remove('hidden');
      valueGetGiftFree.innerText = ` ${currency}${differenceGift.toFixed(2)} `;
      freeGiftMessage1.innerText = themeStringsGift.freeGiftPart1;
      freeGiftMessage2.innerText = themeStringsGift.freeGiftPart2;
      priceGiftContainer.innerHTML = "Pas Ajouter";
      validateProductdelete();
    }
  }

}

function calculeDiference (value1, value2) {
  return value1 - value2;
}

function validationShippingCountry () {
  if (Object.keys(countryObject).length === 0) return themeStrings.totalShipping;
  
  let country = localStorage.getItem("country");
  if (countryObject[country]) return countryObject[country][1]
  else return Object.values(countryObject)[0][1]
}

function itemCount (list,id_NUmber,count) {
  const itemsList = list.items;
  const spanCount = document.querySelectorAll(".count-header");
  
  for (let i = 0; i < itemsList.length; i++) {
    if(itemsList[i].id == id_NUmber){
      for (let c of spanCount) {
        c.innerHTML = count-1;
      }
      return
    } 
  }

  for (let c of spanCount) {
    c.innerHTML = count;
  }
}

/* 
USE THIS STRINGS TO DYNAMIC FREE SHIPPING BAR

const themeStrings = {
  freeShippingEmpty: "{{ settings.text_livrason_head }}",
  freeShippingPart1: "{{ settings.text_livrason_gratuit | split: '[value]' | first }}",
  freeShippingPart2: "{{ settings.text_livrason_gratuit | split: '[value]' | last }}",
  freeShippingGoal: "{{ settings.text_livrason_goal }}",
  freeShippingShort: "{{ settings.text_livrason_offert }}",
  totalShipping: "{{ settings.price_total_livrason | times: 100 | money }}"
}

*/

