import { displayAnimation } from "../cart/cart";
import { widgetReviews } from "../services/fetchPreviews";

const stampDate = () => {
  let timeContainer = document.querySelectorAll('.jdgm-rev__timestamp');
  timeContainer.forEach(
    function(time) {
      let timerData = time.getAttribute('data-content');
      time.innerHTML = timerData.slice(0,10).replace(/-/g,'/');
    }
  )
}

const saveInfoContainer = (id, handle) => {
  let containerSave = document.getElementById('judgeme_product_reviews')
  containerSave.setAttribute('id_product', id);
  containerSave.setAttribute('handle', handle);
}

const paginationInFetch = () => {
  let containerSave = document.getElementById('judgeme_product_reviews');
  let pageButton = document.querySelectorAll('.jdgm-paginate__page');

  pageButton.forEach(
    button => {
      button.addEventListener(
        'click',
        function() {
          fetchPreviews(containerSave, this.dataset.page);
        }
      ) 
    }
  )
}

export const fetchPreviews = (event, page) => {
  let reviewsContainer = document.getElementById('revs-asycn');
  let idProduct = event.getAttribute('id_product');
  let handleProduct = event.getAttribute('handle');
  let queryObject = {
    handle: handleProduct,
    id: idProduct,
    page: page,
    shop_url: Shopify.shop
  }
  saveInfoContainer(idProduct, handleProduct);
  displayAnimation('revs-asycn');
  return widgetReviews(queryObject)
    .then(widget => reviewsContainer.innerHTML = widget)
    .then((e) => {
      stampDate()
      paginationInFetch()
      return e;
    }, error => console.log(error))
}
