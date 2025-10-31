const form = document.getElementById("loginForm");
const rememberCheckbox = document.getElementById("remember");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = rememberCheckbox.checked;

  if (password.length < 6) {
    alert("Invalid password. Please try again.");
    return;
  }

  alert(
    `Welcome back!\n\nLogged in as: ${email}\n${
      remember ? "You will stay logged in." : ""
    }`
  );
  form.reset();
});

document.querySelector(".google-btn").addEventListener("click", () => {
  alert("Google login would be integrated here with OAuth.");
});

document
  .getElementById("forgotPassword")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const email = prompt(
      "Enter your email address to reset your password:"
    );
    if (email) {
      alert(`Password reset link sent to ${email}`);
    }
  });