const eventClickPanel = (pp, arrow) => {
  if (pp.style.display === 'block') {
    pp.style.display = 'none';
    arrow.style.animation = 'buttonArrow .3s ease forwards';
  } else {
    pp.style.display = 'block';
    arrow.style.animation = 'buttonArrowOut .3s ease forwards';
  }
}

const eventAccordionPlus = (pp, plus, blur) => {
  if (pp.style.display === 'block') {
    pp.style.display = 'none';
    pp.style.animation = 'panelAnimationClose 1s ease forwards'
    plus.classList.remove('animation-plus');
    /* blur.style.animation = 'blurAnimeClose 1s ease'; */
  } else {
    pp.style.display = 'block';
    pp.style.animation = 'panelAnimationOpen 1s ease forwards'
    plus.classList.add('animation-plus');
    /* blur.style.animation = 'blurAnimeOpen 1s ease'; */
  }
}

// acordion logic
export function accordion() {
  const acc = document.getElementsByClassName('accordion');
  for (let accordion of acc) {
    accordion.addEventListener('click', function() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      const arrow = this.querySelector('.icon-chevron-down');
      const plus = this.querySelector('.top-plus');
      const blur = this.querySelector('.blur-accordion');

      panel.dataset.accordion === 'plus-accordion' ? eventAccordionPlus(panel, plus, blur) : eventClickPanel(panel, arrow)
      
    });
  };
}

function desactiveIteration(className) {
  const buttonCategory = document.querySelectorAll(className);
  buttonCategory.forEach(e => {
    e.setAttribute('active', 'false');
  })
}

function activeFaqs(elements) {
  desactiveIteration('.category-event');
  elements.forEach(e => e.setAttribute('active', 'true'))
}

function activeFaqsMovil(elements, element) {
  let active = element.getAttribute('active');
  if(!active || active === "false") {
    elements.forEach(e => e.setAttribute('active', 'true'))
  } else {
    elements.forEach(e => e.setAttribute('active', 'false'))
  } 
}

function activeButtonFaq(button) {
  let dataCategory = button.dataset.category;
  let containerMovil = document.querySelector(`.accordion-faq-movil[data-category='${dataCategory}']`);
  let containerDesktop = document.querySelector(`.accordion-faq-desktop[data-category='${dataCategory}']`);

  if (window.innerWidth < 769) {
    activeFaqsMovil([containerMovil, button], containerMovil);
  } else {
    desactiveIteration('.accordion-faq-desktop');
    activeFaqs([button, containerDesktop]);
  }
  
}

export const filterFaqs = () => {
  const filterCategory = document.querySelectorAll('.category-event');
  filterCategory.forEach(button => {
    button.addEventListener(
      'click',
      function() {activeButtonFaq(this);}
    )
  })
}

export const listenerClickMenu = () => {
  const itemMenu = document.querySelectorAll('.btn_menu-faq');
  for (let item of itemMenu) {
    item.addEventListener('click', ()=>{
      const idHandle = item.getAttribute('id_handle');
      const buttonInside = document.querySelector(`.faq-item[id=${idHandle}] button`);
      eventClickPanel(buttonInside.nextElementSibling);
    });
  }
}