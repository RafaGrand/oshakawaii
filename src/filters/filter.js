import { addCartSubmit } from "../cart/cart";
import { buttonChoices } from "../index-product";
import { filterFetch } from "../services/fetchFilter";
import { templateCardProduct } from "./template-card";

/* export const filterSaves = () => {
  for (let change of paramsFilter) {
    document.querySelector(`.filter-radio[id-checkbox="${change}"]`).checked = true;
    console.log(document.querySelector(`.filter-radio[id-checkbox="${change}"]`));
  }
} */

const compareTags = (objFilter, productsCollections) => {
  let productCommons = [];

  productsCollections.forEach(collection => {
    const arrayRes = collection.tags.filter(value => objFilter.includes(value))
    arrayRes.length > 0 && productCommons.push(collection);
  })

  return productCommons;
}

// use optional
const mapProductsCollection = (obj) => {
  const containerCollection = document.getElementById("array-collection");
  
  let html = "";

  obj.forEach((element, index) => {
    html += templateCardProduct(element, index)
  });

  containerCollection.innerHTML = html;

  addCartSubmit();
  buttonChoices();

}

const addSectionFilter = (query) => {
  const containerCollections = document.getElementById(`shopify-section-${section_id}`);

  filterFetch(query)
    .then(e =>  containerCollections.innerHTML = e)
    .then(() => {
      addCartSubmit();
      buttonChoices();
    })

}

export const removeFilter = () => {
  const btnRemoveFilter = document.getElementById("clear-filter");
  btnRemoveFilter && btnRemoveFilter.addEventListener("click", () => {
    const inputFilter = document.querySelectorAll(".filter-radio");
    for (let checked of inputFilter) {
      checked.checked = false;
    }
    addSectionFilter(url_collection + "");
    paramsFilter = [];
  })
}

export const filterCollection = () => {
  const filterRadio = document.querySelectorAll(".filter-radio");
  
  for (let radio of filterRadio) {
    radio.addEventListener("change", function(ev) {
      const target = ev.target;
      
      const index = paramsFilter.indexOf(target.value);

      { !target.checked ? paramsFilter.splice(index, 1) : paramsFilter.push(target.value) }

      let paramsPush = paramsFilter.toString().split(',').join('+');
      console.log(paramsPush);
      let params;
      let filtered;

      paramsPush == [] ? (
        params = url_collection + "",
        filtered = collection.products
      ) :
      (
        params = url_collection + "/+" + paramsPush,
        filtered = compareTags(paramsFilter, collection.products)
      )
      
      addSectionFilter(params);
      
    })
  }
}