// Here is the code to display the edit mode and to edit the works

// tâches réalisées depuis la dernière session :
// - création du bouton logout, nettoyage du localstorage on click
// - suppression des catégories lors du chargement en mode adimn
// - création de la modal

// tâches à réaliser :

// import functions from work.js
import {
  getWorks,
  getCategories,
  addWorkElement,
  addCategory,
} from "./work.js";


// Create an event listener on the modal's close buttons and the modal's background
const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", handleCloseButtonClick);
});
const modalBackground = document.querySelector(".modal__background");
modalBackground.addEventListener("click", handleCloseButtonClick);

// Create an event listener on the modal's left arrow
const leftArrow = document.querySelector(".fa-arrow-left");
leftArrow.addEventListener("click", handleLeftArrowClick);

// function to handle the click on a edit button
function handleEditButtonClick() {
  const modal = document.querySelector(".modal");
  const modalBackground = document.querySelector(".modal__background");
  modal.classList.remove("hidden");
  modalBackground.classList.remove("hidden");
  
}

// function to handle the click on the close button
function handleCloseButtonClick() {
  const modalBackground = document.querySelector(".modal__background");
  modalBackground.classList.add("hidden");
  const modals = document.querySelectorAll(".modal:not(.hidden)");
  modals.forEach((modal) => {
    modal.classList.add("hidden");
  });
}

// function to handle the click on the left arrow
function handleLeftArrowClick() {
  const modal = document.querySelector(".modalPageOne");
  const modalTwo = document.querySelector(".modalPageTwo");
  modal.classList.remove("hidden");
  modalTwo.classList.add("hidden");
}

// function to handle the click on the add work button
function handleAddWorkButtonClick() {
  const modal = document.querySelector(".modalPageOne");
  const modalTwo = document.querySelector(".modalPageTwo");
  modal.classList.add("hidden");
  modalTwo.classList.remove("hidden");
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
      i.addEventListener("click", (event) => {
        handleWorkDeletion(figure);
      });

      modal__gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(i);
    });
    const addWorkButton = document.querySelector("#addWork");
    addWorkButton.addEventListener("click", handleAddWorkButtonClick);

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
        // remove the img from the modal
        figure.remove();
        // remove the img from the gallery
        const gallery = document.querySelector(".gallery");
        const figures = gallery.querySelectorAll("figure");
        figures.forEach((figure) => {
          if (figure.dataset.id === workId) {
            figure.remove();
          }
        });
      } else {
        console.error("Failed to delete work");
      }
    })
    .catch((error) => {
      console.error("Error deleting work:", error);
    });
}

// function to fetch the categories and display them in the modal <select>
async function getCategoriesModal() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const modal__select = document.querySelector("#category");
    modal__select.innerHTML = "";

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.innerText = category.name;
      modal__select.appendChild(option);
    });
    console.log(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// function to display the img loaded from the input file into the <img class="preview">
function displayImage(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const preview = document.querySelector("#preview");
      preview.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);

    // toggle off and on hidden class for elements that must appear or disappear once the picture is loaded
    // vider le texte de .addPictureLabel
    //retirer hidden de #preview
    //ajouter hidder à .fa-picture
    // ajouter hidden au p 

    const addPictureLabel = document.querySelector(".addPictureLabel");
    addPictureLabel.classList.add("hidden");
    const preview = document.querySelector("#preview");
    preview.classList.remove("hidden");
    const faPicture = document.querySelector(".fa-picture");
    faPicture.classList.add("hidden");
    const p = document.querySelector(".addPicture p");
    p.classList.add("hidden");

  }
}

// Call the displayImage function when a file is loaded via #addPictureInput
const addPictureInput = document.querySelector("#addPictureInput");
addPictureInput.addEventListener("change", function() {
  displayImage(this);
});




export { checkToken, handleEditButtonClick, getWorksModal, getCategoriesModal };
