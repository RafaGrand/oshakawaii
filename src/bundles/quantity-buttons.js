import { suscriptionButtons } from "../suscriptions/index-suscriptions";
import { pushInBundle } from "./create-pack";

const changeWithButtons = (type, change, old) => {
  if (type === 'plus') {
    old++;
    change.innerText = old;
  } else {
    if(old != 0) {
      old--;
      change.innerText = old;
    }
  }
  const id = change.getAttribute("variant-pack");
  const variantId = Number(id);
  return [old, variantId]
}

export const comparationEventsQuantity = (type, change, old) => {
  let add = changeWithButtons(type, change, old);
  pushInBundle(add);
}

export const suscriptionButtonPreview = (type, change, old) => {
  let add = changeWithButtons(type, change, old);
  suscriptionButtons(add);
}

function clickButtonEvent(e, change) {
  let target = e.target;
  let typeEvent = target.dataset.event;
  let oldValue = parseFloat(change.innerText);
  return changeWithButtons(typeEvent, change, oldValue);
}

/* MODULE ----> CLICK BUTTONS PACKS */

export function detectButtonsQuantity(processData) {
  const buttons = document.querySelectorAll('.quantity-btn');
  
  buttons.forEach(
    btn => {
      btn.addEventListener(
        'click',
        function (e) {
          let label = this.parentNode.parentNode;
          let count = label.children[0];
          
          let result = clickButtonEvent(e, count);
          processData(result);
        }
      )
    } 
  )
}