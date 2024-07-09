export const API_KEY = "bfd6b563";

const search_inp_el = document.querySelector("#search_inp");
const movies_content_el = document.querySelector(".movies-content");

let favorites = [];

// console.log(document.title);

const searchMovies = async () => {
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
            getItem();
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


function displayMovies(movies){
    movies_content_el.innerHTML = "";
    movies.forEach(movie => {
        const movie_el = createMovieEl(movie);
        movies_content_el.append(movie_el);
    });
}

function createMovieEl(movie){
    const movieElem = document.createElement('div');
    movieElem.classList.add('movie');

    movieElem.innerHTML = `
    <a href="movie/movie.html?imdbID=${movie.imdbID}">
      <img src="${movie.Poster}" alt="${movie.Title}">
    </a>
    <div class="movieText">
      <h2 class="white">${movie.Title}</h2>
      <p class="white">${movie.Year}</p>
      <button id="btn" class="fav-btn">favorites</button>
      </div>
  `;

   const bo = false;
    const favButton = movieElem.querySelector('.fav-btn');
   if (!bo) {
       favButton.addEventListener('click', () => addToFavoritesList(movie));
       favButton.style.backgroundColor = 'rgb(245, 197, 24)'; // Set background color for non-favorites
       favButton.style.color = 'black';
   }

  return movieElem;
}

function addToFavoritesList(movie) {
    console.log(movie)
    const imdbID = movie.imdbID;
    const isAlreadyInFavorites = favorites.some(item => item.imdbID === imdbID);

    if (!isAlreadyInFavorites) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log(favorites)
    }
    searchMovies();
}

function getItem() {
    const storedFavorites = localStorage.getItem('favorites');
    
    if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
    }
    console.log(favorites)
};