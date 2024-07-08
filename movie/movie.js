
const API_KEY = 'bfd6b563';

const movieDetails = document.getElementById('movieDetailsPage');

const fetchMovieDetails = async (imdbID) => {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
        const data = await res.json();

        if (data.Response === "True") {
            displayMovieDetials(data);
        }
        else {
            movieDetails.innerHTML = '<p>Movie details not available.</p>'; 
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

function displayMovies(movie){
    // todo
}