

// index.js
import { footerTemplate, navTemplate } from './templates.mjs';

document.querySelector('footer').innerHTML = footerTemplate();
document.querySelector('nav').innerHTML = navTemplate();

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});


// Wait for everything to render
document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html?success=loggedout";
    });
  }
});

