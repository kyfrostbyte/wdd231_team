import { renderTrailCard } from './templates.mjs';
import trailData from './trail-data.json';

document.addEventListener('DOMContentLoaded', () => {
    const trailsContainer = document.getElementById('trails-container');
    const loggedInUser = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (loggedInUser && users[loggedInUser]) {
        const favoriteTrailIds = users[loggedInUser].favoriteTrails || [];
        const favoritedTrails = trailData.filter(trail => favoriteTrailIds.includes(trail.id));

        if (favoritedTrails.length > 0) {
            trailsContainer.innerHTML = '<h1>Your Favorited Trails</h1>';
            favoritedTrails.forEach(trail => {
                trailsContainer.appendChild(renderTrailCard(trail));
            });
        } else {
            trailsContainer.innerHTML = `
        <h1>Your Favorited Trails</h1>
        <p>You haven't favorited any trails yet.</p>
        <p>Explore trails on the <a href="index.html">home page</a> and click the heart icon to add them to your favorites!</p>
      `;
        }
    } else {
        trailsContainer.innerHTML = `
      <h1>Access Your Trails</h1>
      <p>Please <a href="login.html">sign in</a> to view your favorited trails.</p>
      <p>Don't have an account? <a href="create-account.html">Create one here</a>.</p>
    `;
    }
});
