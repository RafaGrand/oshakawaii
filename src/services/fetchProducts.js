import axios from "axios";

export const productsRequest = () => {
  const urlItems = "/products.json?limit=100";
  const request = axios(urlItems)
  return request.then(cart => cart.data);
}