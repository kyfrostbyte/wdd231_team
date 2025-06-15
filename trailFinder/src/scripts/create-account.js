const form = document.getElementById('account-form');
const message = document.getElementById('message');

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
}

function validatePhone(phone) {
  return /^[0-9]{10,15}$/.test(phone.replace(/\D/g, ''));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const username = form.username.value.trim();
  const password = form.password.value;
  const phone = form.phone.value.trim();

  // Clear any previous error styles
  [form.name, form.email, form.username, form.password, form.phone].forEach(input => {
    input.style.borderColor = '#ccc';
  });

  // Field presence
  if (!name || !email || !username || !password || !phone) {
    message.style.color = 'red';
    message.textContent = 'Please fill out all fields.';
    return;
  }

  // Email format
  if (!validateEmail(email)) {
    message.style.color = 'red';
    message.textContent = 'Please enter a valid email address.';
    form.email.style.borderColor = 'red';
    return;
  }

  // Password strength
  if (!validatePassword(password)) {
    message.style.color = 'red';
    message.textContent = 'Password must be at least 8 characters and contain both letters and numbers.';
    form.password.style.borderColor = 'red';
    return;
  }

  // Phone number
  if (!validatePhone(phone)) {
    message.style.color = 'red';
    message.textContent = 'Please enter a valid phone number (10–15 digits).';
    form.phone.style.borderColor = 'red';
    return;
  }

  const users = getUsers();

  // Username uniqueness
  if (users[username]) {
    message.style.color = 'red';
    message.textContent = 'Username already exists.';
    form.username.style.borderColor = 'red';
    return;
  }

  // Save user
  users[username] = { name, email, password, phone };
  setUsers(users);

  message.style.color = 'green';
  message.textContent = 'Account created successfully! Redirecting...';

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
});
