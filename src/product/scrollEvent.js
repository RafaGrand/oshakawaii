const onScrollMenu = () => {
  const mainContent = document.getElementById('MainContent');
  const buttonAdd  = document.querySelector('.container-fixed-movil');

  const newShowMenu = window.scrollY > mainContent.offsetHeight;

  if(newShowMenu) {
    buttonAdd.classList.remove('fixed-btn')
  } else {
    buttonAdd.classList.add('fixed-btn')
  }
}

export const scrollNav = () => document.addEventListener('scroll', onScrollMenu);
