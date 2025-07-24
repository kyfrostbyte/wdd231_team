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

export function renderTrailCard(trail) {
  const trailCard = document.createElement("div");
  trailCard.classList.add("trail-card");

  const loggedInUser = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const favoriteTrails =
    loggedInUser && users[loggedInUser]
      ? users[loggedInUser].favoriteTrails || []
      : [];
  const isFavorited = favoriteTrails.includes(trail.id);
  const heartIconSrc = isFavorited
    ? "./src/assets/heart-filled.svg"
    : "./src/assets/heart-empty.svg";

  trailCard.innerHTML = `
    <img src="${trail.imageUrl}" alt="${trail.name}" />
    <div class="card-content">
      <p class="card-location">${trail.location}</p>
      <div class="card-details">
        <span class="difficulty-badge ${trail.difficulty.toLowerCase()}">${trail.difficulty}</span>
        <span>${trail.length} miles</span>
        <span class="card-rating">${"★".repeat(Math.round(trail.rating))}${"☆".repeat(5 - Math.round(trail.rating))} (${trail.rating})</span>
        <img src="${heartIconSrc}" alt="Favorite" class="favorite-icon" data-trail-id="${trail.id}" />
      </div>
      <p class="card-description">${trail.description}</p>
    </div>
  `;

  const favoriteIcon = trailCard.querySelector(".favorite-icon");
  favoriteIcon.addEventListener("click", (event) => {
    event.stopPropagation();

    if (!loggedInUser) {
      alert("Please log in to favorite trails.");
      return;
    }

    const trailId = parseInt(event.target.dataset.trailId);

    // READ the latest users from localStorage every click to avoid stale data
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    let currentUserFavorites = users[loggedInUser]?.favoriteTrails || [];

    if (currentUserFavorites.includes(trailId)) {
      // Remove from favorites
      currentUserFavorites = currentUserFavorites.filter(id => id !== trailId);
      event.target.src = "./src/assets/heart-empty.svg";
    } else {
      // Add to favorites
      currentUserFavorites.push(trailId);
      event.target.src = "./src/assets/heart-filled.svg";
    }

    users[loggedInUser].favoriteTrails = currentUserFavorites;
    localStorage.setItem("users", JSON.stringify(users));

    // Notify other parts of the app about the change
    document.dispatchEvent(new CustomEvent('favoriteChanged'));
  });

  return trailCard;
}


export function navTemplate() {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const loggedInUser = localStorage.getItem("loggedInUser");
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
        <li><a href="your-trails.html">Your Trails</a></li>
        <li><a href="about.html">About</a></li>
        <li>
          <a href="${isLoggedIn ? "profile.html" : "login.html"}">
            ${isLoggedIn ? "Profile" : "Login"}
          </a>
        </li>
        ${
          isLoggedIn
            ? `
        <li>
          <a href="#" id="logout-link">Logout</a>
        </li>`
            : ""
        }
      </ul>
    </nav>
  `;
}
