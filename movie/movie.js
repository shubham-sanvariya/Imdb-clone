
import {API_KEY} from "../index.js";

const movieDetails = document.getElementById('movieDetailsPage');

const fetchMovieDetails = async (imdbID) => {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
        const data = await res.json();

        // if the resposne is true display movie card else not available
        if (data.Response === "True") {
            displayMovieCard(data);
        }
        else {
            movieDetails.innerHTML = '<p>Movie details not available.</p>'; 
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

function displayMovieCard(movie){
    movieDetails.innerHTML = `
    <div class="movie-box">
      <div class="movie-poster">
        <img src="${movie.Poster}" alt="${movie.Title}">
      </div>
      <div class="movie-details">
        <h2 class="yellow">${movie.Title}</h2><br>
        <p class="white"><strong>Year:</strong> ${movie.Year}</p><br>
        <p class="white"><strong>Released:</strong> ${movie.Released} &nbsp &nbsp <strong>Runtime:</strong> ${movie.Runtime}</p><br>
        <p class="white"><strong>IMDB:</strong> ${movie.imdbRating}</p><br>
        <p class="white"><strong>Genre:</strong> ${movie.Genre}</p><br>
        <p class="white"><strong>Writer:</strong> ${movie.Writer}</p><br>
        <p class="white"><strong>Actors:</strong> ${movie.Actors}</p><br>
        <p class="white"><strong>Director:</strong> ${movie.Director}</p><br>
        <p class="white"><strong>Plot:</strong> ${movie.Plot}</p>
      </div>
    </div>
  `;
}

// getting the imdb id from the url 
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

// if id is present then call fetch fn other wise it will give invalid

if (imdbID) {
    fetchMovieDetails(imdbID);
} else {
    movieDetailsContainer.innerHTML = '<p>Invalid movie details.</p>';
}