


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
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        const token = data.token;
        // Do something with the token
        console.log(token);
    })
    .catch(error => {
        // Handle error
        console.error(error);
    });
}

const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    loginUser();
});

