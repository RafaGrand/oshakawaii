function displaySuscriptionInactive (attr, textActive, textDesactive, target) {
  if (attr) {
    textActive && (target.innerText = textActive);
    target.setAttribute('active', '');
  } else {
    textDesactive && (target.innerText = textDesactive);
    target.setAttribute('active', 'true');
  }
}

function validateySibling () {
  const attrActive = this.getAttribute('active');
  const dataTextActive = this.dataset.textactive;
  const dataTextDesactive = this.dataset.textdesactive;
  displaySuscriptionInactive(attrActive, dataTextActive, dataTextDesactive, this);
}

function clickOnTarget (target, action) {
  target.addEventListener(
    'click',
    action
  )
}

export function openElementSibling () {
  const targets = document.querySelectorAll('.open-sibling');
  targets.forEach(
    target => clickOnTarget(target, validateySibling)
  )
}