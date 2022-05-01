const clickFormAddresse = (ev) => {
  const target = ev.target;
  const id = target.dataset.form;
  const eventType = target.dataset.event;

  if(eventType === "edit") {
    document.getElementById('container-addresses-list').classList.add('hidden');
    document.getElementById('container-addresses-forms').classList.remove('hidden');
    document.querySelector(`.address-container[data-form="${id}"]`).classList.add('hidden');
    document.querySelector(`.form-edit-addresse[data-form="${id}"]`).classList.remove('hidden');
  }else {
    document.getElementById('container-addresses-list').classList.remove('hidden');
    document.getElementById('container-addresses-forms').classList.add('hidden');
    document.querySelector(`.address-container[data-form="${id}"]`).classList.remove('hidden');
    document.querySelector(`.form-edit-addresse[data-form="${id}"]`).classList.add('hidden');
  }
  
}


export const openFormEdit = () => {
  const buttonEdit = document.querySelectorAll('.edit-addresse');

  for (let button of buttonEdit) {
    button.addEventListener('click', (e) => { 
      clickFormAddresse(e);
    })
  }

}