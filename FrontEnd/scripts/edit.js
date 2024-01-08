// Here is the code to display the edit mode and to edit the works

// tâches réalisées depuis la dernière session :
// - création du bouton logout, nettoyage du localstorage on click
// - suppression des catégories lors du chargement en mode adimn
// - création de la modal

// tâches à réaliser :

// import functions from edit
import {
  getWorks,
  getCategories,
  addWorkElement,
  addCategory,
} from "./work.js";

// function to handle the click on a edit button
function handleEditButtonClick(event) {
  const modal = document.querySelector(".modal");
  const modalBackground = document.querySelector(".modal__background");
  modal.classList.remove("hidden");
  modalBackground.classList.remove("hidden");
}

// function to handle the click on the close button
function handleCloseButtonClick() {
  const modal = document.querySelector(".modal");
  const modalBackground = document.querySelector(".modal__background");
  modal.classList.add("hidden");
  modalBackground.classList.add("hidden");
}

const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", handleCloseButtonClick);

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

    //toggle on the hidden class for elements with .filter class
    const filter = document.querySelectorAll(".filter");
    filter.forEach((filter) => {
      filter.classList.add("hidden");
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

    //toggle off the hidden class for elements with .filter class
    const filter = document.querySelectorAll(".filter");
    filter.forEach((filter) => {
      filter.classList.remove("hidden");
    });
  }
}

// function du get works to display in the modal
async function getWorksModal() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();

    const modal__gallery = document.querySelector(".modal__gallery");
    modal__gallery.innerHTML = "";

    works.forEach((work) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const i = document.createElement("i");

      img.src = work.imageUrl;
      figure.dataset.id = work.id;
      i.classList.add("fa-solid", "fa-trash-can", "suppr");

      // Add event listener to the <i> element
      i.addEventListener("click", () => {
        handleWorkDeletion(figure);
      });

      modal__gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(i);
    });

    console.log(works);
  } catch (error) {
    console.error("Error fetching works:", error);
  }
}

// Function to handle the deletion of a work
function handleWorkDeletion(figure) {
  const workId = figure.dataset.id; // Get the work ID from the dataset
  const token = localStorage.getItem("token"); // Get the token from local storage

  // Send a DELETE request to the backend with the token
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Work deleted successfully");
        figure.remove();
      } else {
        console.error("Failed to delete work");
      }
    })
    .catch((error) => {
      console.error("Error deleting work:", error);
    });
}

export { checkToken, handleEditButtonClick, getWorksModal };
