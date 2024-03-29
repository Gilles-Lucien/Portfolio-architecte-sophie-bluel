// Here is the code to display the works and filter them by category

// import functions from edit
import { checkToken, getWorksModal, getCategoriesModal } from "./edit.js";
import { getWorks, addWorkElement } from "./callAPI.js";

// API URL variable
const API_URL = "http://localhost:5678/api";

// function to add a category button to the filters
function addCategory(category, filtersDiv) {
  const buttonElement = document.createElement("button");
  buttonElement.innerText = category.name;
  buttonElement.dataset.category = category.id;
  buttonElement.classList.add("filter");
  buttonElement.classList.toggle("filter--active", category.id === "all"); // toggle "filter--active" class if category id is "all"
  filtersDiv.appendChild(buttonElement);
  buttonElement.addEventListener("click", handleFilterClick);
  checkToken();
}

// async function to get the categories filters from the API

async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const categories = await response.json();
    categories.unshift({ id: "all", name: "Tous" });
    const filtersDiv = document.querySelector(".filters");
    categories.forEach((category) => {
      addCategory(category, filtersDiv);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// function to handle the click on a filter button
function handleFilterClick(event) {
  const categoryId = event.target.dataset.category;

  // toggle active class on filter buttons
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach((button) => {
    button.classList.toggle("filter--active", button === event.target);
  });

  // toggle hidden class on works
  const works = document.querySelectorAll(".gallery figure");
  works.forEach((work) => {
    const isAllButton = categoryId === "all";
    const isMatchingCategory = work.dataset.category === categoryId;
    work.classList.toggle("hidden", !isAllButton && !isMatchingCategory);
  });
}

getWorks();
getCategories();
checkToken();
getWorksModal();
getCategoriesModal();

export { getWorks, getCategories, addWorkElement, addCategory, API_URL };
