let works = [];
let categories = [];

// API URL variable
const API_URL = "http://localhost:5678/api";

// async function to get the works from the API
async function getWorks() {
  try {
    if (works.length > 0) {
      return works;
    }
    const response = await fetch(`${API_URL}/works`);
    const result = await response.json();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    works = result;
    works.forEach((workCard) => {
      addWorkElement(workCard, gallery);
    });
  } catch (error) {
    console.error("Error fetching works:", error);
  }
}

// function to add a work element to the gallery
function addWorkElement(work, gallery) {
  const workElement = document.createElement("figure");
  workElement.dataset.category = work.categoryId;
  workElement.dataset.id = work.id;

  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;

  const titleElement = document.createElement("figcaption");
  titleElement.innerText = work.title ?? "(aucun titre)";

  gallery.appendChild(workElement);
  workElement.appendChild(imageElement);
  workElement.appendChild(titleElement);
}

// async function to fetch the categories and display them in the modal <select> by calling populateCategories()
async function getCategoriesModal() {
  try {
    if (categories.length > 0) {
      populateCategories(categories);
      return;
    }

    const response = await fetch(`${API_URL}/categories`);
    categories = await response.json();
    populateCategories(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// function to populate the categories in the modal <select> from the categories array
function populateCategories(categories) {
  const modal__select = document.querySelector("#category");
  modal__select.innerHTML = "";

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.name;
    modal__select.appendChild(option);
  });
}

// Function to handle the deletion of a work and update the works array
function handleWorkDeletion(figure) {
  const workId = figure.dataset.id; // Get the work ID from the dataset
  const token = localStorage.getItem("token"); // Get the token from local storage

  // Send a DELETE request to the backend with the token
  fetch(`${API_URL}/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        // update works array to delete the work from it
        works = works.filter((work) => work.id !== workId);
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
      }
    })
    .catch((error) => {
      console.error("Error deleting work:", error);
    });
}

export {
  works,
  getWorks,
  addWorkElement,
  getCategoriesModal,
  handleWorkDeletion,
};
