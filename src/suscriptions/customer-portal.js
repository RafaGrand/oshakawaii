import { openModalWA } from "../interactions/open-modals.js";
import { updateSuscriptionPortal } from "./portal-services.js";

export function listenerFormsSuscriptions() {
  let buttonsForm = document.querySelectorAll('.focus-form');

  buttonsForm.forEach(form => {
    form.addEventListener(
      'submit',
      function (e) {
        useDataform (e, this, requestSuscribe)
      }
    )
  })
}

const entriesForm = (form) => {
  let dataPost = {};
  Object
    .keys(form.elements)
    .forEach(
      key => {
        let e = form.elements[key];
        if (e.type !== "submit") {
          dataPost[e.name] = e.value;
        }
      }
    );

  return dataPost;
}

function useDataform (event, form, action) {
  event.preventDefault();
  const url = form.action;
  
  let data = entriesForm(form);

  action(url, data, form);
}

async function requestSuscribe(url, dataPost, form) {
  try {
    form.querySelector('button[type=submit]').innerHTML = `<div class="flex-c-justify"><span class="spinner-loader" button="true"></span></div>`
    await updateSuscriptionPortal(url, dataPost);
    window.location.reload();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export function onChangeFrequencySelector () {
  const frequencySelectors = document.querySelectorAll('.sltr-event-suscription[name=order_interval_frequency]');
  frequencySelectors.forEach(
    selector => {
      selector.addEventListener(
        'change',
        function () {
          let form = this.parentNode;
          let value = this.value;
          form.querySelector('[name=charge_interval_frequency]').value = value;
        }
      )
    }
  )
}

export function onChangeInputSuscription () {
  const inputsChange = document.querySelectorAll('.sltr-event-suscription');
  inputsChange.forEach(
    input => {
      input.addEventListener(
        'change',
        function () {
          let form = this.parentNode;
          form.querySelector('button[type=submit]').style.display = 'initial';
        }
      )
    }
  )
}
export function resetDateInput () {
  const inputsDate = document.querySelectorAll('.sltr-date-subscription[type=date]');
  inputsDate.forEach(
    date => {
      date.min = new Date().toISOString().split("T")[0];
    }
  )
}

export function clickDeleteSubs () {
  let btnsDelete = document.querySelectorAll('.btn-event-delete');
  btnsDelete.forEach(
    btn => {
      btn.addEventListener(
        'click',
        function () {
          openModalRetention(this);
        }
      )
    }
  )
}

export function clickCloseBtnModal () {
  let btnsCloseRetention = document.querySelectorAll('.close-modal-retention-event');
  btnsCloseRetention.forEach(
    btn => {
      btn.addEventListener(
        'click',
        function (e) {
          closeModalRetention(e)
        }
      )
    }
  )
}

function closeModalRetention (e) {
  let parent = e.target.parentNode;
  let modal = parent.parentNode;
  let overlay = document.getElementById("overlay");
  openModalWA(overlay, modal);
}

function openModalRetention (button) {
  let modal = button.nextElementSibling;
  let overlay = document.getElementById("overlay");
  openModalWA(overlay, modal);
}