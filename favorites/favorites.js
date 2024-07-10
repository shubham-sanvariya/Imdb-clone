

// card = `
// <div class="favorite-movies">
//             <div class="movie-poster">
//                 <a href="movie.html?imdbID=${movie.imdbID}">
//                     <img class="poster" src="${movie.Poster}" alt="${movie.Title}">
//                 </a>
//             </div>
//             <div class="movie-details">
//                 <h2 class="yellow">${movie.Title}</h2><br>
//                 <p class="white"><strong>Year:</strong> ${movie.Year}</p><br>
//                 <button class="remove-btn red" data-imdbID="${movie.imdbID}">Delete
//                 </button>
//             </div>
//         </div>
// `;

import { getFavorites } from "../index.js";

let favorites = [];

document.addEventListener("DOMContentLoaded", () => {
    favorites = getFavorites("fav");
    console.log(favorites);
})

