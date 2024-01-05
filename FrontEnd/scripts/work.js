// Here is the code to display the works and filter them by category

// tâches réalisées depuis la dernière session :
// - création d'une fonction avec paramètre pour ajouter un élément de travail à la galerie
// - création d'une fonction avec paramètre pour ajouter un bouton de catégorie aux filtres
// - unshift pour ajouter un élément au début du tableau

// tâches à réaliser :
// supprimer les catégories lors du chargement en mode adimn


// import functions from edit
import { checkToken } from "./edit.js";

// function to add a work element to the gallery
function addWorkElement(work, gallery) {
  const workElement = document.createElement("figure");
  workElement.dataset.id = work.categoryId;

  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;

  const titleElement = document.createElement("figcaption");
  titleElement.innerText = work.title ?? "(aucun titre)";

  gallery.appendChild(workElement);
  workElement.appendChild(imageElement);
  workElement.appendChild(titleElement);
}

// async function to get the works from the API
async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    console.log(works);

    works.forEach((workCard) => {
      addWorkElement(workCard, gallery);
    });
  } catch (error) {
    console.error("Error fetching works:", error);
  }
}

// function to add a category button to the filters
function addCategory(category, filtersDiv) {
  const buttonElement = document.createElement("button");
  buttonElement.innerText = category.name;
  buttonElement.dataset.id = category.id;
  buttonElement.classList.add("filter"); // if id === "all" ? "filter--active" : ""
  filtersDiv.appendChild(buttonElement);
  buttonElement.addEventListener("click", handleFilterClick);
}

// async function to get the categories filters from the API
async function getCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    categories.unshift({ id: "all", name: "Tous" });

    console.log(categories);

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
  const categoryId = event.target.dataset.id;
  const buttonId = event.target.id;
  console.log("Filter button clicked:", categoryId);

  // toggle active class on filter buttons
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach((button) => {
    button.classList.toggle("filter--active", button === event.target);
  });

  // toggle hidden class on works
  const works = document.querySelectorAll(".gallery figure");
  works.forEach((work) => {
    const isAllButton = categoryId === "all";
    const isMatchingCategory = work.dataset.id === categoryId;
    work.classList.toggle("hidden", !isAllButton && !isMatchingCategory);
  });
}


getWorks();
getCategories();
checkToken();
