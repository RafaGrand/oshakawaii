import { itemsCart } from "../cart/cart";
import { productsRequest } from "../services/fetchProducts"

export const createVariants = async () => {
  const all = await productsRequest();
  all.products.forEach(product => {
    variants = [...variants, ...product.variants]
  })
  await itemsCart();
}

export const getVariantData = (variantId) => {
  if (variants.length <= 0) return { compare_at_price: '...', price: '...' };
  const variantFilter = variants.filter(variant => variant.id === variantId);
  return variantFilter[0];
}
