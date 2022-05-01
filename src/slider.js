const unSelect = () => {
  const imagess = document.querySelectorAll('.button-media');
  imagess.forEach((e) => {
    e.setAttribute('active', 'false');
  })
}

const eventSlide = (btn, operator) => {
  const btnSlider = document.querySelectorAll(btn);

  for (let b of btnSlider) {

    b.addEventListener(
      'click',
      function (e) {
        
        const target = e.target; 
        const dataId = target.getAttribute('scroll-id');
        const containerScroll = document.querySelector(`.container-scroll[scroll-id='${dataId}']`);
        const elementItem = containerScroll.children[0].children[0].offsetWidth;
        const index = target.dataset.index;
        
        if (operator) {
          {
            operator === -1 
              ? containerScroll.children[0].scrollLeft -= elementItem
              : containerScroll.children[0].scrollLeft += elementItem
          }
        } else {
          containerScroll.children[0].scrollLeft = elementItem * Number(index);
          unSelect();
          target.setAttribute('active', 'true');
        }

      }
    )

  }
}

export const sliderFunction = () => {
  eventSlide('.btn-slider-left', -1);
  eventSlide('.btn-slider-rigth', 1);
}

export const sliderCarrousel = () => {
  eventSlide('.button-media')
}