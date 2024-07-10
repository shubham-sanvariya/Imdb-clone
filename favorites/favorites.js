



import { getFavorites, removeFromFavoritesList } from "../index.js";

let favorites = [];

document.addEventListener("DOMContentLoaded", () => {
    favorites = getFavorites("fav");
    console.log(favorites);
    fetchFavorites();
});

const parent = document.querySelector(".container");

function fetchFavorites() {
    parent.innerHTML = "";
    if (favorites.length > 0) {
        favorites.forEach((fav) => {
            displayFavorite(fav);
        })
    }
}

function displayFavorite(movie) {

    const favorite_movie_el = document.createElement("div");
    favorite_movie_el.classList.add("favorite-movies");
    favorite_movie_el.innerHTML = `
            <div class="movie-poster">
                <a href="../movie/movie.html?imdbID=${movie.imdbID}">
                    <img class="poster" src="${movie.Poster}" alt="${movie.Title}">
                </a>
            </div>
            <div class="movie-details">
            <a href="../movie/movie.html?imdbID=${movie.imdbID}">
                <h2>${movie.Title}</h2><br>
            </a>
                <p><strong>Year:</strong> ${movie.Year}</p><br>
                <button class="remove-btn">Delete
                </button>
            </div>`;

    const removeFromFavBtn = favorite_movie_el.querySelector(".remove-btn")
    removeFromFavBtn.addEventListener("click", () => removeFromFavorites(movie))

    parent.appendChild(favorite_movie_el);
}

function removeFromFavorites(movie) {
    favorites = removeFromFavoritesList(movie, "fav")
    if (favorites) {
        fetchFavorites();
    }
}

