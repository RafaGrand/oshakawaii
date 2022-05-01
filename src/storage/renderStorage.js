export function renderStorage(packLocalStorage) {
  packLocalStorage.forEach(local => {
    let container = document.querySelector(`.quantity-packing[variant-pack="${local.id}"]`);
    if(!container) return null;
    container.innerText = local.quantity
  })
}

export function toConvertLocalStorage(dataLocal) {
  return localStorage.getItem(dataLocal) 
  ? JSON.parse(localStorage.getItem(dataLocal)) 
  : [];
}