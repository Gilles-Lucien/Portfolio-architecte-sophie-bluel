// Here is the code to display the edit mode and to edit the works

// tâches réalisées depuis la dernière session :
// - création du bouton logout, nettoyage du localstorage on click

// tâches à réaliser :
// supprimer les catégories lors du chargement en mode adimn

// function to handle the click on a edit button
function handleEditButtonClick(event) {
  // Handle the click event for the edit button
  console.log("Edit button clicked:", event.target);
}

// Check if token is defined in local storage and display edit mode if it is
function checkToken() {
  if (localStorage.getItem("token") !== null) {
    // Toggle off the .hidden class for elements with .editBar class
    const editBars = document.querySelectorAll(".editBar");
    editBars.forEach((editBar) => {
      editBar.classList.remove("hidden");
    });

    // Toggle off the .hidden class for elements with .editButton class and add event listener
    const editButtons = document.querySelectorAll(".editButton");
    editButtons.forEach((editButton) => {
      editButton.classList.remove("hidden");
      editButton.addEventListener("click", handleEditButtonClick);
    });

    // Change innerText of logout button to login button and clear local storage on click
    const logoutButton = document.querySelector(".logout");
    logoutButton.innerHTML = `<a href="#" class="logout">logout</a>`;
    logoutButton.addEventListener("click", () => {
      localStorage.clear();
      checkToken();
    });

  } else {
    // Toggle on the .hidden class for elements with .editBar class
    const editBars = document.querySelectorAll(".editBar");
    editBars.forEach((editBar) => {
      editBar.classList.add("hidden");
    });

    // Toggle on the .hidden class for elements with .editButton class
    const editButtons = document.querySelectorAll(".editButton");
    editButtons.forEach((editButton) => {
      editButton.classList.add("hidden");
    });

    // Change innerText of logout button to login button and clear local storage on click
    const logoutButton = document.querySelector(".logout");
    logoutButton.innerHTML = `<a href="./login.html" class="logout">login</a>`;
  }
}

export { checkToken };
