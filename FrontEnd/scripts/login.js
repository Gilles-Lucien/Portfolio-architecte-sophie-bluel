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
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      const token = data.token;
      // Store the token in localStorage
      localStorage.setItem("token", token);
      // Store the user id in localStorage
      localStorage.setItem("userId", data.userId);
      // Redirect to index.html if token is defined
      token && (window.location.href = "./index.html");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Invalid email or password");
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});
