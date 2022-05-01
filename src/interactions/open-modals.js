export const openModalWA = (overlay, modal) => {
  { modal.getAttribute('open') === "true" ?
    (
      overlay.style.display = "none",
      modal.style.animation = "fadeOutModal 0.3s ease-in-out forwards",
      modal.setAttribute('open', 'false')
    ) :
    (
      overlay.style.display = "block",
      modal.style.animation = "fadeInModal 0.3s ease-in-out forwards",
      modal.setAttribute('open', 'true')
    )
  }
}