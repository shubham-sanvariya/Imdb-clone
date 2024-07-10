



import { getFavorites } from "../index.js";

let favorites = [];

document.addEventListener("DOMContentLoaded", () => {
    favorites = getFavorites("fav");
    console.log(favorites);
    fetchFavorites();
});

const cont = document.querySelector(".container");

function fetchFavorites(){
    cont.innerHTML = "";
    if (favorites.length > 0) {
        favorites.forEach((fav) => {
            displayFavorite(fav);
        })
    }
}

function displayFavorite(movie){

    const favorite_movie_el = document.createElement("div");
    favorite_movie_el.classList.add("favorite-movies");
    favorite_movie_el.innerHTML = `
            <div class="movie-poster">
                <a href="movie.html?imdbID=${movie.imdbID}">
                    <img class="poster" src="${movie.Poster}" alt="${movie.Title}">
                </a>
            </div>
            <div class="movie-details">
                <h2 class="yellow">${movie.Title}</h2><br>
                <p class="white"><strong>Year:</strong> ${movie.Year}</p><br>
                <button class="remove-btn red" data-imdbID="${movie.imdbID}">Delete
                </button>
            </div>`;

    cont.append(favorite_movie_el);
}

