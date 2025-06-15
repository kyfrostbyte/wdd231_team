
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const messageEl = document.getElementById('message');

  function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '{}');
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value;

    const users = getUsers();


    if (users[username] && users[username].password === password) {
    localStorage.setItem('loggedInUser', username);
    messageEl.style.color = 'green';
    messageEl.textContent = 'Login successful!';
    setTimeout(() => window.location.href = 'index.html', 1000);
    } else {
      messageEl.style.color = 'red';
      messageEl.textContent = 'Invalid username or password.';
    }
  });
});

