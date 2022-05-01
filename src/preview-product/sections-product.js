import { fetchIndexProduct } from "../services/fetchPreviews";

async function innerSection(handle, section, container) {
  let fetchSection = await fetchIndexProduct(handle, section);
  container.innerHTML = fetchSection;
  return fetchSection;
}

export async function renderIndex(handle) {
  let containerIndex = document.getElementById('index-product-preview');
  let request = await innerSection(handle, 'product-index', containerIndex);
  return request;
}

export async function renderIcons(handle) {
  let containerIndex = document.getElementById('icons-product-preview');
  return await innerSection(handle, 'icons-product', containerIndex);
}

export async function renderAccordions(handle) {
  let containerIndex = document.getElementById('accordions-product-preview');
  return await innerSection(handle, 'accordions-product', containerIndex);
}

export async function renderIngredients(handle) {
  let containerIndex = document.getElementById('ingredients-product-preview');
  return await innerSection(handle, 'ingredient-product', containerIndex);
}