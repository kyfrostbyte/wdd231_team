import { renderTrailCard } from './templates.mjs';

async function loadAndRenderFavoritedTrails() {
  const trailsContainer = document.getElementById('trails-container');
  
  try {
    const response = await fetch('src/scripts/trail-data.json');
    if (!response.ok) throw new Error('Failed to load trail data');
    const trailData = await response.json();
    
    renderFavoritedTrails(trailsContainer, trailData);
  } catch (error) {
    console.error('Error loading trail data:', error);
    trailsContainer.innerHTML = `
      <h1>Error</h1>
      <p>Sorry, we couldn't load your favorited trails right now.</p>
    `;
  }
}

function renderFavoritedTrails(container, trailData) {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (loggedInUser && users[loggedInUser]) {
    const favoriteTrailIds = users[loggedInUser].favoriteTrails || [];
    const favoritedTrails = trailData.filter(trail => favoriteTrailIds.includes(trail.id));

    if (favoritedTrails.length > 0) {
      container.innerHTML = '<h1>Your Favorited Trails</h1>';
      favoritedTrails.forEach(trail => {
        container.appendChild(renderTrailCard(trail));
      });
    } else {
      container.innerHTML = `
        <h1>Your Favorited Trails</h1>
        <p>You haven't favorited any trails yet.</p>
        <p>Explore trails on the <a href="index.html">home page</a> and click the heart icon to add them to your favorites!</p>
      `;
    }
  } else {
    container.innerHTML = `
      <h1>Access Your Trails</h1>
      <p>Please <a href="login.html">sign in</a> to view your favorited trails.</p>
      <p>Don't have an account? <a href="create-account.html">Create one here</a>.</p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', loadAndRenderFavoritedTrails);

document.addEventListener('favoriteChanged', () => {
  const trailsContainer = document.getElementById('trails-container');

  // Reload trail data and re-render the list
  fetch('src/scripts/trail-data.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load trail data');
      return response.json();
    })
    .then(trailData => {
      renderFavoritedTrails(trailsContainer, trailData);
    })
    .catch(error => {
      console.error('Error loading trail data:', error);
      trailsContainer.innerHTML = `
        <h1>Error</h1>
        <p>Sorry, we couldn't load your favorited trails right now.</p>
      `;
    });
});
