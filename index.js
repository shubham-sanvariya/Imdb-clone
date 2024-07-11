export const API_KEY = "bfd6b563";

const search_inp_el = document.querySelector("#search_inp");
const movies_content_el = document.querySelector(".movies-content");

let favorites = [];

window.addEventListener("load", () => {
    getFavorites();
})

const searchMovies = async () => {
    if (search_inp_el === null) return;

    const input_val = search_inp_el.value;

    if (input_val === '') {
        movies_content_el.innerHTML = ''; // Clear the main content area
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${input_val}`);
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayMovies(data.Search); // Display search results
        }
        else {
            movies_content_el.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

if (document.title === "IMBD Clone") {
    search_inp_el.addEventListener("input", searchMovies);
}


function displayMovies(movies) {
    movies_content_el.innerHTML = "";
    movies.forEach(movie => {
        const movie_el = createMovieEl(movie);
        movies_content_el.append(movie_el);
    });
}

function isFavorite(imdbID, favorites) {
    return favorites.some(favorite => favorite.imdbID === imdbID);
}

function createMovieEl(movie) {
    const movieElem = document.createElement('div');
    movieElem.classList.add('movie');

    const favoriteStatus = isFavorite(movie.imdbID, favorites);

    movieElem.innerHTML = `
    <a href="movie/movie.html?imdbID=${movie.imdbID}">
      <img src="${movie.Poster}" alt="${movie.Title}">
    </a>
    <div class="movieText">
    <a href="movie/movie.html?imdbID=${movie.imdbID}">
      <h2 class="white">${movie.Title}</h2>
    </a>
      <p class="white">${movie.Year}</p>
      <button id="btn" class="fav-btn"><i></i></button>
      </div>
  `;

    const favButton = movieElem.querySelector('.fav-btn');
    if (!favoriteStatus) {
        favButton.addEventListener('click', () => addToFavoritesList(movie));
        favButton.style.backgroundColor = 'gold';
        favButton.children[0].textContent = "Add to favorites";
    } else {
        favButton.addEventListener("click", () => removeFromFavoritesList(movie));
        favButton.style.backgroundColor = 'red';
        favButton.style.color = 'white';
        favButton.textContent = "in favorites"
    }

    return movieElem;
}

function addToFavoritesList(movie) {
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log(favorites)
    searchMovies();
}

export function removeFromFavoritesList(movie, p = "") {
    favorites = favorites.filter((m) => m.imdbID !== movie.imdbID);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log(favorites);
    if (p === "") {
        searchMovies();
    }else{
        searchMovies();
        return favorites;
    }
}

export function getFavorites(p = ""){
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
    }
    if (p === "") {
        searchMovies();
    }else{
        return favorites;
    }
}