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
