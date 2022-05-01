import { currency } from "./currency/index.js";

const variantPrice = (node, inner) => {
  document.querySelector(node).innerText = `${inner}`;
}

const fixedPrice = (number) => {
  return number;
}

const inCaseAvailable = (available, prodID) => {
  const cartBtn = document.querySelector(`.btn-add-card[product_id="${prodID}"]`);
  const textBtnSold = document.querySelector(`.class-sold[product_id="${prodID}"]`);
  const textBtnAdd = document.querySelector(`.class-add[product_id="${prodID}"]`);

  if (available) {
    cartBtn.removeAttribute("disabled");
    textBtnSold.classList.add("hide");
    textBtnAdd.classList.remove("hide");
  } else {
    cartBtn.setAttribute("disabled", "disabled");
    textBtnSold.classList.remove("hide");
    textBtnAdd.classList.add("hide");
  }
}

const updateVariantInformation = (variant, prodID) => {
  variant.map(
    selected => {
      const price = fixedPrice(selected.price)
      const comparePrice = selected.compare_at_price ? currency + fixedPrice(selected.compare_at_price) : '';

      variantPrice(`.price_product[product_id="${prodID}"]`, currency + price);
      variantPrice(`.price_compare[product_id="${prodID}"]`, comparePrice);
      inCaseAvailable(selected.available, prodID)

    }
  )
}

const changeListener = (e, prodID) => {
  const id_product = e.target.getAttribute("value");
  const filterProduct = variants.filter(item => item.id === parseInt(id_product));

  updateVariantInformation(filterProduct, prodID);
  
}

const displayContentOn = (content) => {
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

export const blurCard = () => {
  document.addEventListener(
    'click',
    function(event) {
      
      if (!event.target.closest(".card-container")) {

        const btnChoices = document.querySelectorAll(".btn-choices");
        const variantContainer = document.querySelectorAll(".variants-non");

        for (let btnChoice of btnChoices) {
          btnChoice.classList.remove("active");
          btnChoice.classList.remove("non-render");
        }

        for (let variant of variantContainer) {
          variant.style.display = "none";
        }
      }
    },
    false
  )
}

export function buttonChoices() {
  const btnChoices = document.querySelectorAll(".btn-choices");
  
  btnChoices.forEach(btn => {
    btn.addEventListener(
      'click',
      function() {
        this.classList.toggle("active");
        this.classList.toggle("non-render");
        var select = this.nextElementSibling;
        displayContentOn(select);
      }
    );
  });

}

export function changeSelectValue() {
  const inputSelected = document.querySelectorAll(".rad-input");
  
  inputSelected.forEach(radio => {
    radio.addEventListener(
      'change',
      (e) => {
        changeListener(e, e.target.getAttribute("id_prod"));
      }
    );
  })

}
