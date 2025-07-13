document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const messageEl = document.getElementById("message");

  const params = new URLSearchParams(window.location.search);

  const prefillUsername = params.get("username");
  if (prefillUsername) {
    loginForm.username.value = prefillUsername;
  }
  const error = params.get("error");
  const success = params.get("success");

  if (error === "invalid") {
    messageEl.textContent = "Invalid username or password.";
    messageEl.style.color = "red";
  } else if (success === "created") {
    messageEl.textContent = "Account created! Please log in.";
    messageEl.style.color = "green";
  }

  function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "{}");
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value;
    const users = getUsers();

    if (users[username] && users[username].password === password) {
      localStorage.setItem("loggedInUser", username);
      messageEl.style.color = "green";
      messageEl.textContent = "Login successful!";
      setTimeout(() => (window.location.href = "index.html"), 1000);
    } else {

      const newParams = new URLSearchParams();
      newParams.set("username", username);
      newParams.set("error", "invalid");
      window.location.search = newParams.toString();
    }
  });
});
