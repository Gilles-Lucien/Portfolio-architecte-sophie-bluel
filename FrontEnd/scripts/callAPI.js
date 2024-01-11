let works = [];

// API URL variable
const API_URL = "http://localhost:5678/api";

// async function to get the works from the API
async function getWorks() {
  try {
    console.log(works);
    if (works.length > 0) {
      return works;
    }
    const response = await fetch(`${API_URL}/works`);
    const result = await response.json();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    console.log(result);
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

export { works, getWorks, addWorkElement };



