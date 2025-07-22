// templates.js

export function footerTemplate() {
  return `
      <p>&copy; ${new Date().getFullYear()} - WDD231</p>
      <p>
        <a href="/privacy">Privacy Policy</a> |
        <a href="/terms">Terms of Service</a>
      </p>
  `;
}

export function navTemplate() {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const loggedInUser = localStorage.getItem('loggedInUser');
  const isLoggedIn = loggedInUser && users[loggedInUser];

  return `
    <nav class="navbar">
      <div class="nav-container">
        <a href="#" class="nav-logo">
          <img src="src/assets/logo.webp" alt="logo of a green leaf" />
        </a>
        <h1 class="site-title">Trail Finder</h1>
        <button class="nav-toggle" aria-label="Toggle menu">&#9776;</button>
      </div>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="coming-soon.html">Trails</a></li>
        <li><a href="coming-soon.html">About</a></li>
        <li>
          <a href="${isLoggedIn ? 'profile.html' : 'login.html'}">
            ${isLoggedIn ? 'Profile' : 'Login'}
          </a>
        </li>
        ${isLoggedIn ? `
        <li>
          <a href="#" id="logout-link">Logout</a>
        </li>` : ''}
      </ul>
    </nav>
  `;
}

