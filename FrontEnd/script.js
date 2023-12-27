// async function to get the works from the API
async function getWorks() {
  const answer = await fetch("http://localhost:5678/api/works");
  const works = await answer.json();
  const contentWorks = JSON.stringify(works);
  console.log(contentWorks.length);
  console.log(contentWorks);
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

/*trouver comment map contentWorks pour récupérer les données de chaque work*/


  for (let i = 0; i < contentWorks.length; i++) {
    const workCard = contentWorks[i];
    // Recovery of the DOM element which will host the works
    const gallery = document.querySelector(".gallery");
    // Creation of a tag dedicated to a work
    const workElement = document.createElement("figure");
    
    // creation of a data-id attribute for each work
    // workElement.dataset.id = workCard[i].id;

    // Création of the tags inside the figure
    const imageElement = document.createElement("img");
    imageElement.src = workCard.imageUrl;
    imageElement.alt = workCard.title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = workCard.title ?? "(aucun titre)";

    // On rattache la balise article a la section Fiches
    gallery.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
  }
}
getWorks();

// function genererPieces(pieces) {
//     for (let i = 0; i < pieces.length; i++) {

//         const article = pieces[i];
//         // Récupération de l'élément du DOM qui accueillera les fiches
//         const sectionFiches = document.querySelector(".fiches");
//         // Création d’une balise dédiée à une pièce automobile
//         const pieceElement = document.createElement("article");
//         pieceElement.dataset.id = pieces[i].id
//         // Création des balises
//         const imageElement = document.createElement("img");
//         imageElement.src = article.image;
//         const nomElement = document.createElement("h2");
//         nomElement.innerText = article.nom;
//         const prixElement = document.createElement("p");
//         prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
//         const categorieElement = document.createElement("p");
//         categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
//         const descriptionElement = document.createElement("p");
//         descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
//         const stockElement = document.createElement("p");
//         stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
//         //Code ajouté
//         const avisBouton = document.createElement("button");
//         avisBouton.dataset.id = article.id;
//         avisBouton.textContent = "Afficher les avis";

//         // On rattache la balise article a la section Fiches
//         sectionFiches.appendChild(pieceElement);
//         pieceElement.appendChild(imageElement);
//         pieceElement.appendChild(nomElement);
//         pieceElement.appendChild(prixElement);
//         pieceElement.appendChild(categorieElement);
//         pieceElement.appendChild(descriptionElement);
//         pieceElement.appendChild(stockElement);
//         //Code aJouté
//         pieceElement.appendChild(avisBouton);

//     }
//     ajoutListenersAvis();
// }
