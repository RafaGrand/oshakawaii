import { openModalCart } from "./cart/open-close";

export function Menu () {

  this.drop =  function () {
    activeDropMenu();
  };

  this.burguer = function () {
    activeMenu();
  };

  this.cart = function () {
    let cartOpen = document.getElementById("cart_btn");
    let modalCart = document.getElementById("cart-side");

    cartOpen.addEventListener("click", function() {
      openModalCart(false, modalCart);
    })
  };

}

const activeMenu = () => {
  let menuID = document.getElementById('SiteNav');
  let burguerID = document.getElementById('container-icon-burguer');
  
  let top = document.querySelector('.top-x');
  let middle = document.querySelector('.middle-x');
  let bottom = document.querySelector('.bottom-x');

  burguerID.addEventListener(
    'click',
    () => {
      menuID.classList.toggle('menu-active');
    
      top.classList.toggle('anim-t-x');
      middle.classList.toggle('anim-m-x');
      bottom.classList.toggle('anim-b-x');
  });

}

const arrowRotate = (target) => {
  let expanded = target.getAttribute('aria-expanded');

  if (expanded === 'true') {
    target.setAttribute('aria-expanded', 'false');
  } else {
    target.setAttribute('aria-expanded', 'true');
  }
  
}

function activeDropMenu () {
  
  let buttonDrop = document.querySelectorAll('.button-menu-drop');
    
  for (let drop of buttonDrop) {
    drop.addEventListener(
      'click',
      (e) => {
        const target = e.target;
        const idDrop = target.dataset.drop;
        let dropdown = document.querySelector(`.dropdown-menu[id='drop-${idDrop}']`);
        arrowRotate(target);
        
        dropdown && dropdown.classList.toggle('drop-active');
    })
  };

}