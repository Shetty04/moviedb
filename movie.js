const movieTitle = document.querySelector("#movieTitle");
const posterImage = document.querySelector("#posterImg");
const heroImage = document.querySelector("#heroImage");

const type = document.querySelector("#type");
const releaseDate = document.querySelector("#releaseDate");
const runTime = document.querySelector("#runTime");
const genre = document.querySelector("#genre");
const plot = document.querySelector("#plot");

async function fetchMovie(movieId) {
  try {
    const apiUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=3219c50a`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching random movies", error);
    return [];
  }
}

(async () => {
  try {
    const searhParams = new URLSearchParams(window.location.search);
    const movieId = searhParams.get("movieId");

    const movie = await fetchMovie(movieId);
    displayBlock(movie);
    console.log(movie);
  } catch (error) {
    console.error("error fetching random movie", error);
  }
})();

function displayBlock(movie) {
  movieTitle.innerHTML = movie.Title;

  posterImage.src = movie.Poster;
  posterImage.alt = "Dynamic Image";

  heroImage.src = movie.Poster;
  heroImage.alt = "hero";

  type.textContent = movie.Type;
  releaseDate.textContent = movie.Released;
  runTime.textContent = movie.Runtime;
  genre.textContent = movie.Genre;
  plot.textContent = movie.Plot;
}
