import { itemsCart } from "../cart/cart";

  /**
 * give the containers a margin so that they are dynamic and are distributed according to the amount defined in the cuztomize
 * 
 * @author: Miguel Angel Camacho
 * @see marginText
 * @param {percentage} percentage Wide percentage that it will occupy in the side cart bar
 * @param {progressMargin} progressMargin container progress of side cart 
 */

function marginText(percentage, progressMargin) {
  if(percentage < 30){
    progressMargin.style.marginLeft = "0px";
  } 
  else if(percentage >  70){
    progressMargin.style.marginLeft = "-100px";
  } 
  else {
    progressMargin.style.marginLeft = "-60px";
  }
}


export const validateBarFreeShipping = (startFree) => {
  let barShipping = document.querySelector('#livrason-bar');
  let containerShipping = document.querySelector('.progress-bar-livrason');

  let progress = document.querySelector('.progress');
  let lineCadeau = document.querySelector('.progress-offert-gift-amount');
  let lineOffert= document.querySelector('.progress-offert-shipping-amount');
  let priceStartFree = document.querySelector('.progress-offert_price-startFree');
  let cadeauAmount = document.getElementById('cadeau-amount');

  let progressMarginShipping = document.getElementById("progress-margin_shipping");
  let progressMarginGift = document.getElementById("progress-margin_gift");

  let containerMessage = document.querySelector('#message-country-geo');
  let partialPrice = startFree[0];
  let totalMax = 100;
  
  if (startFree[0] === 0) {
    containerShipping.classList.add('hidden');
    barShipping.max = 999999;
  } else {
    
    if (cadeauAmount.value != 5) {
      containerMessage.innerHTML = startFree[2];
      containerShipping.classList.remove('hidden');
      lineOffert.classList.remove('hidden');
      lineCadeau.classList.remove('hidden');
      lineCadeau.classList.remove('active');
      barShipping.max = totalMax;
      barShipping.setAttribute(`price`, `${partialPrice}`);
  
      let percentageCadeu = parseInt((cadeauAmount.value/100)*100);
      let percentageOffert = parseInt((startFree[0]/100)*100);
  
      lineCadeau.style.left = `${percentageCadeu}%`;
      lineOffert.style.left = `${percentageOffert}%`;
  
      marginText(percentageCadeu, progressMarginGift);
      marginText(percentageOffert, progressMarginShipping);
  
      priceStartFree.innerHTML =`€${startFree[0]} Livraison offerte`;
      
    } else {
      containerMessage.innerHTML = startFree[2];
      lineOffert.classList.add('hidden');
      lineCadeau.classList.add('hidden');
      progress.classList.add('active');
      containerShipping.classList.remove('hidden');
      barShipping.max = startFree[0];
      barShipping.setAttribute(`price`, `${partialPrice}`);

    }
  }
  itemsCart();
}

export function selectCountry() {
  const countryInput = document.querySelectorAll('.input-currency');
  countryInput.forEach(item => {
    item.addEventListener(
      'change',
      (e) => {
        let valueChange = e.target.value;
        let countryInfo = countryObject[valueChange];
        
        validateBarFreeShipping(countryInfo);
      }
    )
  })
}