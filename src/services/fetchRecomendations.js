import axios from "axios";

export const recomendationsProduct = () => {
  const containerRecomended = document.getElementById("recommended-shopify");
  let sectionID = containerRecomended.getAttribute("data-section-id");
  let productID = containerRecomended.getAttribute("data-product-id");

  const url = `/recommendations/products?section_id=${sectionID}&product_id=${productID}&limit=4`;
  const request = axios(url);
  return request.then(res => res.data);
}