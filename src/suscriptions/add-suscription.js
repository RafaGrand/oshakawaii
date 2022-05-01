import { findIndex, someId } from "../bundles/create-pack";

function findElementSuscription(object, id, quantity, frequency) {
  const index = findIndex(object, id);
  
  if(index != -1) {
    object[index].quantity = quantity
    object[index].frequency = frequency
    quantity === 0 && object.splice(index, 1)
  }
}

function verifyArraySuscription (quantity, id, frequency, arraySuscription) {
  let hasThisProduct = someId(arraySuscription, id);

  !hasThisProduct
    ? arraySuscription.push({id: id, quantity: quantity, frequency: frequency})
    : findElementSuscription(arraySuscription, id, quantity, frequency)

  return arraySuscription;
}

function createNewDataStructure(initial) {
  let finalStructure = {};
  initial.forEach(
    item => {
      if(finalStructure.hasOwnProperty(item.frequency)) {
        return finalStructure[item.frequency] += item.quantity;
      }
      finalStructure[item.frequency] = item.quantity;
    }
  )
  return finalStructure
}

export function renderSuscriptionUI(newEstructure) {
  let html = "";
  let containersData = document.querySelectorAll('.text-dynamic-suscription');

  if (newEstructure === []) return null;

  Object.entries(newEstructure).forEach(
    ([frequency, quantity]) => {
      html += `<p>${infoSuscription.assambly1} <strong>${quantity} ${infoSuscription.product}</strong> ${infoSuscription.assambly2} <strong>${frequency} ${infoSuscription.frequency_unit}</strong><p>`;
    }
  )

  containersData.forEach(
    e => {
      e.innerHTML = html
    }
  )
}

export function addProductSuscription(quantity, id, suscriptions, frequency) {
  // add new product suscription
  let newUpdate = verifyArraySuscription(quantity, id, frequency, suscriptions);
  // generate a new data estructure with frecuencies
  let newDataStructure = createNewDataStructure(newUpdate);
  priceListSuscriptions(newUpdate)

  // render in UI with new estructure
  let subscriptionButton = document.getElementById('fixed-button-suscription');
  subscriptionButton && renderSuscriptionUI(newDataStructure);

  localStorage.setItem("suscription", JSON.stringify(newUpdate));
  localStorage.setItem("frequencies", JSON.stringify(newDataStructure));
}

function priceListSuscriptions(Object){
  let options ={};
  Object.forEach((e)=>{
    let newId = e.id;
    let price = document.querySelector(`.quantity-packing[variant-pack="${newId}"]`)?.dataset.price;
    options[newId]= price;
  })
  sessionStorage.setItem("price", JSON.stringify(options));
}