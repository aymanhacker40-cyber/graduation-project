const form = document.getElementById('signupForm');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeatPassword');
const passwordMatch = document.getElementById('passwordMatch');
const nationalId = document.getElementById('nationalId');
const nationalIdHint = document.getElementById('nationalIdHint');
const phone = document.getElementById('phone');
const phoneHint = document.getElementById('phoneHint');
const age = document.getElementById('age');

// Password validation requirements
const requirements = {
  length: document.getElementById('req-length'),
  upper: document.getElementById('req-upper'),
  lower: document.getElementById('req-lower'),
  number: document.getElementById('req-number'),
  special: document.getElementById('req-special')
};

// Validate password strength
function validatePassword() {
  const value = password.value;
  
  // Check length (at least 8 characters)
  if (value.length >= 8) {
    requirements.length.classList.add('valid');
    requirements.length.textContent = '✓ At least 8 characters';
  } else {
    requirements.length.classList.remove('valid');
    requirements.length.textContent = '✗ At least 8 characters';
  }
  
  // Check uppercase letter
  if (/[A-Z]/.test(value)) {
    requirements.upper.classList.add('valid');
    requirements.upper.textContent = '✓ At least 1 uppercase letter';
  } else {
    requirements.upper.classList.remove('valid');
    requirements.upper.textContent = '✗ At least 1 uppercase letter';
  }
  
  // Check lowercase letter
  if (/[a-z]/.test(value)) {
    requirements.lower.classList.add('valid');
    requirements.lower.textContent = '✓ At least 1 lowercase letter';
  } else {
    requirements.lower.classList.remove('valid');
    requirements.lower.textContent = '✗ At least 1 lowercase letter';
  }
  
  // Check number
  if (/[0-9]/.test(value)) {
    requirements.number.classList.add('valid');
    requirements.number.textContent = '✓ At least 1 number';
  } else {
    requirements.number.classList.remove('valid');
    requirements.number.textContent = '✗ At least 1 number';
  }
  
  // Check special character
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
    requirements.special.classList.add('valid');
    requirements.special.textContent = '✓ At least 1 special character';
  } else {
    requirements.special.classList.remove('valid');
    requirements.special.textContent = '✗ At least 1 special character';
  }
}

// Check if password is valid
function isPasswordValid() {
  const value = password.value;
  return value.length >= 8 &&
         /[A-Z]/.test(value) &&
         /[a-z]/.test(value) &&
         /[0-9]/.test(value) &&
         /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
}

// Check password match
function checkPasswordMatch() {
  if (repeatPassword.value === '') {
    passwordMatch.textContent = '';
    passwordMatch.className = 'password-match';
  } else if (password.value === repeatPassword.value) {
    passwordMatch.textContent = '✓ Passwords match';
    passwordMatch.className = 'password-match success';
  } else {
    passwordMatch.textContent = '✗ Passwords do not match';
    passwordMatch.className = 'password-match error';
  }
}

// Validate National ID (must be 14 digits)
function validateNationalId() {
  const value = nationalId.value;
  const isNumeric = /^\d+$/.test(value);
  
  if (value === '') {
    nationalIdHint.textContent = 'Must be exactly 14 digits';
    nationalIdHint.className = 'input-hint';
    nationalId.classList.remove('error', 'success');
  } else if (!isNumeric) {
    nationalIdHint.textContent = '✗ Must contain only numbers';
    nationalIdHint.className = 'input-hint error';
    nationalId.classList.add('error');
    nationalId.classList.remove('success');
  } else if (value.length !== 14) {
    nationalIdHint.textContent = `✗ Must be exactly 14 digits (current: ${value.length})`;
    nationalIdHint.className = 'input-hint error';
    nationalId.classList.add('error');
    nationalId.classList.remove('success');
  } else {
    nationalIdHint.textContent = '✓ Valid National ID';
    nationalIdHint.className = 'input-hint success';
    nationalId.classList.remove('error');
    nationalId.classList.add('success');
  }
}

// Validate Phone Number (must be 11 digits)
function validatePhone() {
  const value = phone.value;
  const isNumeric = /^\d+$/.test(value);
  
  if (value === '') {
    phoneHint.textContent = 'Must be exactly 11 digits';
    phoneHint.className = 'input-hint';
    phone.classList.remove('error', 'success');
  } else if (!isNumeric) {
    phoneHint.textContent = '✗ Must contain only numbers';
    phoneHint.className = 'input-hint error';
    phone.classList.add('error');
    phone.classList.remove('success');
  } else if (value.length !== 11) {
    phoneHint.textContent = `✗ Must be exactly 11 digits (current: ${value.length})`;
    phoneHint.className = 'input-hint error';
    phone.classList.add('error');
    phone.classList.remove('success');
  } else {
    phoneHint.textContent = '✓ Valid Phone Number';
    phoneHint.className = 'input-hint success';
    phone.classList.remove('error');
    phone.classList.add('success');
  }
}

// Only allow numbers for National ID and Phone
nationalId.addEventListener('input', function(e) {
  this.value = this.value.replace(/[^\d]/g, '');
  validateNationalId();
});

phone.addEventListener('input', function(e) {
  this.value = this.value.replace(/[^\d]/g, '');
  validatePhone();
});

// Password validation listeners
password.addEventListener('input', function() {
  validatePassword();
  checkPasswordMatch();
});

repeatPassword.addEventListener('input', checkPasswordMatch);

// Form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Validate age
  const ageValue = parseInt(age.value);
  if (ageValue < 18) {
    alert('You must be at least 18 years old to register');
    age.focus();
    return;
  }

  // Validate National ID
  if (nationalId.value.length !== 14 || !/^\d+$/.test(nationalId.value)) {
    alert('National ID must be exactly 14 digits');
    nationalId.focus();
    return;
  }

  // Validate Phone
  if (phone.value.length !== 11 || !/^\d+$/.test(phone.value)) {
    alert('Phone number must be exactly 11 digits');
    phone.focus();
    return;
  }

  // Validate password
  if (!isPasswordValid()) {
    alert('Password must meet all requirements:\n- At least 8 characters\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 number\n- At least 1 special character');
    password.focus();
    return;
  }

  // Check password match
  if (password.value !== repeatPassword.value) {
    alert('Passwords do not match!');
    repeatPassword.focus();
    return;
  }

  // If all validations pass
  const formData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    age: ageValue,
    gender: document.getElementById('gender').value,
    nationalId: nationalId.value,
    phone: phone.value,
    email: document.getElementById('email').value,
    password: password.value
  };

  console.log('Form submitted:', formData);
  alert('Account created successfully!\n\nName: ' + formData.firstName + ' ' + formData.lastName + '\nEmail: ' + formData.email + '\nPhone: ' + formData.phone);
  
  form.reset();
  passwordMatch.textContent = '';
  nationalIdHint.textContent = 'Must be exactly 14 digits';
  nationalIdHint.className = 'input-hint';
  phoneHint.textContent = 'Must be exactly 11 digits';
  phoneHint.className = 'input-hint';
  
  // Reset password requirements
  Object.values(requirements).forEach(req => {
    req.classList.remove('valid');
    req.textContent = req.textContent.replace('✓', '✗');
  });
});