const translateEvent = (ev) => {
  let local = ev.getAttribute('key');
  localStorage.setItem('local', local);
  let item = localStorage.getItem('local');
  console.log(item);
}


export const onChangeLanguage = () => {
  let selectLanguage = document.querySelectorAll('.ly-custom-dropdown-list li');
  
  selectLanguage.forEach(
    li => {
      li.addEventListener(
        'click',
        function() {
          translateEvent(this);
        }
      )                            
    }
  )
}