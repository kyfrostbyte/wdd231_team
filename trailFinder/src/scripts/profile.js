document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!loggedInUser || !users[loggedInUser]) {
    window.location.href = "login.html"; // not logged in
    return;
  }

  const user = users[loggedInUser];
  document.getElementById("name").textContent = user.name;
  document.getElementById("email").textContent = user.email;
  document.getElementById("phone").textContent = user.phone;
  document.getElementById("username").textContent = loggedInUser;

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
});

document.getElementById("back-home").addEventListener("click", () => {
  window.location.href = "index.html";
});
