const disabledLinks = (urls, attr, setAttr) => {
  [...urls].forEach(url => {
    url.setAttribute(attr, setAttr)
  })
}

const blockedLinks = (down) => {
  const allLinks = document.querySelectorAll('.url-card');
  down
    ? disabledLinks(allLinks, 'disabled', 'disabled')
    : disabledLinks(allLinks, 'disabled', '')
}

export const scrollCash = () => {

  const sliderTouch = document.querySelectorAll(".scroll-touch");
  let isDown = false;
  let startX;
  let scrollLeft;
  
  for (let slider of sliderTouch) {
    slider.addEventListener("mousedown", e => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
      blockedLinks(isDown);
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
      blockedLinks(isDown);
    });
    slider.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      blockedLinks(isDown);
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

}