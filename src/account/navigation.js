export const eventItemNavigation = () => {
  const buttonNav = document.querySelectorAll('.button-item-nav');
  const param = window.location.search;
  let result = param.split('=');

  const containerInformations = document.querySelector("#containers-details");

  if(result[1] === "2"){
    setAndRemoveActiveItem(buttonNav, containerInformations);
  }else{
    setActiveItem(containerInformations);   
  }
  
  for (let button of buttonNav) {
    button.addEventListener(
      'click',
      (e) => { 
        buttonClickNav(e);
      }
    )
  }
}

const buttonClickNav = (ev) => {
  const target = ev.target;
  const id = target.dataset.account;
  
  forEachSetActive ('.button-item-nav', (item) => item.setAttribute("active", ""));
  target.setAttribute("active", "active");

  forEachSetActive ('.container-account', (item) => item.setAttribute("active", ""));
  document.querySelector(`.container-account[data-account=${id}]`).setAttribute("active", "active");
}

function forEachSetActive (targets, action) {
  document
    .querySelectorAll(targets)
    .forEach(
      target => action(target)
    )
}

const setAndRemoveActiveItem = (buttonNav,containerInformations) => {
  buttonNav.forEach(item => {
    item.removeAttribute('active');
  });
  const btnCommandes = document.querySelector("#orders-button");
  const containerOrders = document.querySelector("#container-orders");

  containerInformations.removeAttribute("active");
  btnCommandes.setAttribute('active','active');
  containerOrders.setAttribute('active','active');

}

const setActiveItem = (containerInformations) => {
    const btnInformations = document.querySelector("#details-button");
    if(btnInformations !== null){
      btnInformations.setAttribute("active","active");
      containerInformations.setAttribute("active", "active");
    }
    
}


