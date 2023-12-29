// Here is the code to login a user

function loginUser() {
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');

  const email = emailInput.value;
  const password = passwordInput.value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const token = data.token;
      // Store the token in localStorage
      localStorage.setItem("token", token);
      // Redirect to index.html if token is defined
      token && (window.location.href = "./index.html");
      // If token is undefined, alert the user
      token || alert("Invalid email or password");
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});
