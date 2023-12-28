// async function to get the works from the API
async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    console.log(works);

    works.forEach((workCard) => {
      const workElement = document.createElement("figure");
      workElement.dataset.id = workCard.categoryId;

      const imageElement = document.createElement("img");
      imageElement.src = workCard.imageUrl;
      imageElement.alt = workCard.title;

      const titleElement = document.createElement("figcaption");
      titleElement.innerText = workCard.title ?? "(aucun titre)";

      gallery.appendChild(workElement);
      workElement.appendChild(imageElement);
      workElement.appendChild(titleElement);
    });
  } catch (error) {
    console.error("Error fetching works:", error);
  }
}

// async function to get the categories filters from the API
async function getCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    console.log(categories);

    const filtersDiv = document.querySelector(".filters");
    // create a unique button "all"
    const firstButtonElement = document.createElement("button");
    firstButtonElement.innerText = "Tous";
    firstButtonElement.id = "all";
    firstButtonElement.dataset.id = categories
      .map((category) => category.id)
      .join(",");
    firstButtonElement.classList.add("filter", "filter--active");
    filtersDiv.appendChild(firstButtonElement);
    // create a button for each category
    categories.forEach((category) => {
      const buttonElement = document.createElement("button");
      buttonElement.innerText = category.name;
      buttonElement.dataset.id = category.id;
      buttonElement.classList.add("filter");
      filtersDiv.appendChild(buttonElement);
    });

    // add event listener to filter buttons
    const filterButtons = document.querySelectorAll(".filter");
    filterButtons.forEach((button) => {
      button.addEventListener("click", handleFilterClick);
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
    const isAllButton = buttonId === "all";
    const isMatchingCategory = work.dataset.id === categoryId;

    work.classList.toggle("hidden", !isAllButton && !isMatchingCategory);
  });
}

getWorks();
getCategories();
