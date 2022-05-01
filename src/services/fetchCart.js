import axios from "axios";

/* ------------- FETCH ADD ITEM WIDTH BUTTON CART ------------ */

export const fetchPostAdd = (id, quantity, prop = []) => {
  const urlAdd = "/cart/add.js";
  
  const [frequency, unit_type] = prop;

  const properties = prop === []
    ? {default: null}
    : {"shipping_interval_frequency": frequency, "shipping_interval_unit_type": unit_type}

  const data = {
    'id': id,
    'quantity': quantity,
    "properties": properties
  }
  
  const request = axios({
    method: 'post',
    url: urlAdd,
    data: data
  });
  
  return request;
}

/* ------------ FETCH RENDER ITEMS CART ------------- */
export const cartItemsFetch = () => {
  const urlItems = "/cart.js";
  const request = axios(urlItems)
  
  return request.then(cart => cart.data);
}

/* ------------ FETCH RENDER RECOMENDATIONS ------------- */

export const recomendationsAPI = (id, limit) => {
  const url = `/recommendations/products.json?product_id=${id}&limit=${limit}`;
  const request = axios(url);
  return request.then(res => res.data);
}

/* ------------ FETCH UPDATE QUANTITY ITEM -------------- */

export function updateQuantity(id, quantity, properties = {}) {
  let obj = {updates:{[id]: quantity}};
  const request = axios({
    method: 'post',
    url: "/cart/update.js",
    data: obj 
  });
  
  return request.then(cart => cart.data);
}

/* ------------ FETCH POST GIFT ITEM -------------- */

export function giftProduct() {
  let giftIdProfuct = document.getElementById("giftIdProfuct");
  let giftIdProfuctVAlue = parseInt(giftIdProfuct.value);
  const id_NUmber = parseInt(giftIdProfuctVAlue);
 

  cartItemsFetch()
    .then(dataRes => validateGift(dataRes,id_NUmber))
    .catch(err => console.error('Error:', err));

  }
  
  /**
 * adds the gift directly to the checkout
 * 
 * @author: Miguel Angel Camacho
 * @see validateGift
 * @param {list} list I retrieve the list of all the products in le cart
 * @param {id_NUmber} id_NUmber the id of the gift product to agregar
 */

function validateGift(list,id_NUmber) {
  const itemsList = list.items;

  for (let i = 0; i < itemsList.length; i++) {
    if(itemsList[i].id == id_NUmber){
      return;
    }
  }
  addGifit(id_NUmber);
}

  /**
 * adds the gift directly to the checkout
 * 
 * @author: Miguel Angel Camacho
 * @see addGifit
 * @param {id_NUmber} id_NUmber get the id of gift
 */

function addGifit(id_NUmber) {
  updateGiftProduct();
   
  let formData = {
    items: [
      {
        id: id_NUmber,
        quantity: 1,
      },
    ],
  };
  const promiseBuyCar = fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      updateGiftProduct();
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

}

  /**
 * valid with each user interaction if the gift is in the cart if it is not added but if the minimum amount for the purchase is exceeded add the gift
 * 
 * @author: Miguel Angel Camacho
 * @see validateProductdelete
 */

export function validateProductdelete() {
  let giftIdProfuct = document.getElementById("giftIdProfuct");
  let giftIdProfuctVAlue = parseInt(giftIdProfuct.value);
  const id_NUmber = parseInt(giftIdProfuctVAlue);
 
  cartItemsFetch()
    .then(dataRes => deleteGift(dataRes,id_NUmber)) // process data items
    .catch(err => console.error('Error:', err));

}

  /**
 * valid with each user interaction if the gift is in the cart if it is not added but if the minimum amount for the purchase is exceeded add the gift
 * 
 * @author: Miguel Angel Camacho
 * @see deleteGift
 * @param {list} list I retrieve the list of all the products in le cart
 * @param {id_NUmber} id_NUmber the id of the gift product to remove
 */

function deleteGift(list,id_NUmber) {
  const itemsList = list.items;
  for (let i = 0; i < itemsList.length; i++) {
    if(itemsList[i].id == id_NUmber){
      deleteGiftProduct(id_NUmber)
      break
    }
  }
}

  /**
 * I consult the api to remove the gift
 * 
 * @author: Miguel Angel Camacho
 * @see deleteGiftProduct
 * @param {id_NUmber} id_NUmber the id of the gift product to remove
 */

export function deleteGiftProduct(id_NUmber) {
  let formData = {
    updates: {
      [id_NUmber]: 0,
    },
  }

  const promiseBuyCar = fetch("/cart/update.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

  /**
 * update the gift directly to the checkout
 * 
 * @author: Miguel Angel Camacho
 * @see updateGiftProduct
 */

export function updateGiftProduct() {
  let giftIdProfuct = document.getElementById("giftIdProfuct");
  let giftIdProfuctVAlue = parseInt(giftIdProfuct.value);
  const id_NUmber = parseInt(giftIdProfuctVAlue);
  
    let formData = {
      updates: {
        [id_NUmber]: 1,
      },
    }

    const promiseBuyCar = fetch("/cart/update.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
     
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}

