import axios from "axios";

const fetchReturn = async (param) => {
  let url = `https://judge.me/api/v1/widgets/product_review?${param}`
  const res = await axios(url)
  const json = await res.data;
  return json.widget;
}

export const widgetReviews = ({ handle, id, page, shop_url }) => {
  let queryWidget = new URLSearchParams({
    api_token: '424rNhAL8kJo4k4OCb52bzI41aY',
    shop_domain: shop_url,
    handle: handle,
    external_id: id,
    page: page,
    per_page: 5
  })
  return fetchReturn(queryWidget.toString())
}

export const fetchIndexProduct = (handle, sectionId) => {
  /* INFO FROM VARIANT
  'products/moto-roja?variant=122423423&section_id=accordions-product'
  */
  const request = axios(`/products/${handle}?section_id=${sectionId}`);
  return request.then(res => res.data);
}
