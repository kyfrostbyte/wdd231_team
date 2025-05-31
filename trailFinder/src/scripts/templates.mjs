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
  return `
    <nav class="navbar">
      <div class="nav-container">
        <a href="#" class="nav-logo">
          <img src="src/assets/logo.webp" alt="logo of a green leaf" />
        </a>
        <button class="nav-toggle" aria-label="Toggle menu">&#9776;</button>
      </div>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="coming-soon.html">Trails</a></li>
        <li><a href="coming-soon.html">About</a></li>
      </ul>
  </nav>
  `;
}
