// async function to get the works from the API
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  console.log(works);

  works.forEach(workCard => {
    const workElement = document.createElement("figure");
    workElement.dataset.id = workCard.id;

    const imageElement = document.createElement("img");
    imageElement.src = workCard.imageUrl;
    imageElement.alt = workCard.title;

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = workCard.title ?? "(aucun titre)";

    gallery.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
  });
}

// async function to get the categories from the API
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  console.log(categories);

  // Add your code here to handle the categories data
}

getWorks();
getCategories();

