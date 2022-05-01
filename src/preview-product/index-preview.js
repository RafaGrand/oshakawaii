import { accordion } from "../accordion";
import { scrollCash } from "../scroll-touch";
import { sliderCarrousel } from "../slider";
import { NewProduct } from "./add-product";
import { fetchPreviews } from "./render-reviews";
import { renderAccordions, renderIcons, renderIndex, renderIngredients } from "./sections-product";

const setCloseModal = (modal, overlay) => {
  modal.setAttribute('open', 'false');
  overlay.style.display = 'none';
}

export const modaClosePrev = () => {
  let modalID = document.getElementById('modal-preview');
  let overlayPreview = document.getElementById('overlay-preview');

  document.addEventListener(
    'click',
     e => {
      const target = e.target;
      if(target.closest('#overlay-preview') || target.closest('#close-modal-revs')) {
        setCloseModal(modalID, overlayPreview)
      }
    }
  )
}

const openModalRevs = () => {
  let modalID = document.getElementById('modal-preview');
  let overlayPreview = document.getElementById('overlay-preview');
  overlayPreview.style.display = 'block';
  modalID.setAttribute('open', 'true');
}

export const addIdButtonForm = () => {
  let form = document.querySelector('form.form-product-selected');
  form.id = "form-preview-product";
  form.classList.remove("request-form")
}

const promisesModal = async (event) => {
  let handleProduct = event.getAttribute('handle');

  let fetchRevs = fetchPreviews(event, 1)
  let fetchIndex = renderIndex(handleProduct);
  let fetchIcons = renderIcons(handleProduct);
  let fetchAccordions = renderAccordions(handleProduct);
  let fetchIngredient = renderIngredients(handleProduct);
  let addNew = new NewProduct();
  /* let p5 = new Promise((resolve, reject) => {
    reject("reject");
  }); */
  
  try  {
    await Promise.all([fetchRevs, fetchIndex, fetchIcons, fetchAccordions, fetchIngredient]);
    await openModalRevs();
    sliderCarrousel();
    addIdButtonForm();
    addNew.addIn("#form-preview-product");
    accordion();
    scrollCash();
  } catch(error) {
    console.error(error);
  }
}

export function clickPreviewModal() {
  let openClickPreview = document.querySelectorAll('.drop-preview');
  openClickPreview.forEach(
    item => {
      item.addEventListener(
        'click',
        function() {
          promisesModal(this)
        }
      )
  })
}