const API_KEY = "bfd6b563";

const search_inp_el = document.querySelector("#search_inp");
const movies_content_el = document.querySelector(".movies-content");

const searchMovies = async () => {
    const input_val = search_inp_el.value;
    if (input_val === '') {
        mainContent.innerHTML = ''; // Clear the main content area
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
            mainContent.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

search_inp_el.addEventListener("input", searchMovies);

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
    <a href="movie.html?imdbID=${movie.imdbID}">
      <img src="${movie.Poster}" alt="${movie.Title}">
    </a>
    <div class="movieText">
      <h2 class="white">${movie.Title}</h2>
      <p class="white">${movie.Year}</p>
      <button>favorites</button>
      </div>
  `;

  return movieElem;
}
