export const templatePrice = (price, original) => {
  if (original) {
    return `
      <span class="line-thr">${original}</span>
      <span class="font-bold">${price}</span>
    `
  }
  return `<span class="font-bold">${price}</span>`
}