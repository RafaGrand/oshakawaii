export function displayRecover() {
  const buttonDisplay = document.getElementById('RecoverPassword');
  const customerLogin = document.getElementById('CustomerLoginForm');
  const customerRecover = document.getElementById('RecoverPasswordForm');
  const customereturn = document.getElementById('HideRecoverPasswordLink');
  buttonDisplay && buttonDisplay.addEventListener(
    'click',
    () => {
      customerLogin.classList.add('hidden');
      customerRecover.classList.remove('hidden')
    }
  )
  buttonDisplay && customereturn.addEventListener(
    'click',
    () => {
      customerLogin.classList.remove('hidden');
      customerRecover.classList.add('hidden')
    }
  )
}

export function validatePassword () {
  const inputPass = document.querySelectorAll('.pass-validate');
  const pass1 = document.getElementById('RegisterForm-password');
  const pass2 = document.getElementById('RegisterForm-password_confirm');

  inputPass.forEach(
    i => {
      i.addEventListener(
        'input',
        function () {
          validationForms.passwordCompare({pass1, pass2}, this);
        }
      )
    }
  )
}

 const validationForms = {
  passwordCompare: function ({pass1, pass2}, input) {
    let submitter = input.parentNode.querySelector('input[type="submit"]');
    let message = document.getElementById('password-match');

    validationForms.messageNotMatch({pass1, pass2, message});
    validationForms.blockedSubmit({pass1, pass2, submitter});
  },
  messageNotMatch: function ({pass1, pass2, message}) {
    pass1.value != pass2.value
      ? message.setAttribute('active', 'true')
      : message.setAttribute('active', '')
  },
  blockedSubmit: function ({pass1, pass2, submitter}) {
    pass1.value != pass2.value
      ? submitter.setAttribute('disabled', 'disabled')
      : submitter.removeAttribute('disabled')
  }
}