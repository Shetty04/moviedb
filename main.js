const movieContainer = document.getElementById("movie-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
// const searchButton = document.getElementById()

async function fetchRandomMovie() {
  try {
    const apiUrl = `https://www.omdbapi.com/?s=kabhi&apikey=3219c50a`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.Search;
  } catch (error) {
    console.error("Error fetching random movies", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const movies = await fetchMovieQuery(query);
      displayBlock(movies);
    } catch (error) {
      console.log("Error fetching movies by query", error);
    }
  }
});

async function fetchMovieQuery(query) {
  try {
    const apiUrl = `http://www.omdbapi.com/s=${query}&pageSize=10&apikey=3219c50a`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.movies;
  } catch (error) {
    console.error("Error fetching random Movies", error);
    return [];
  }
}

function displayBlock(movies) {
  movieContainer.innerHtml = "";
  movies.forEach((movie) => {
    const movieOuterCard = document.createElement("div");

    // check  fragments

    movieOuterCard.classList.add("outer-card");
    const movieInnerCard = document.createElement("div");
    movieInnerCard.classList.add("inner-card");
    const img = document.createElement("img");
    img.src = movie.Poster;
    const movieName = document.createElement("div");
    movieName.classList.add("name");
    const title = document.createElement("p");
    title.textContent = movie.Title;
    movieOuterCard.appendChild(movieInnerCard);
    movieOuterCard.appendChild(movieName);
    movieInnerCard.appendChild(img);
    movieName.appendChild(title);
    movieContainer.appendChild(movieOuterCard);

    movieInnerCard.addEventListener("click", () => {
      window.location.href = `/movie.html?movieId=${imdbID}`;
    });
  });
}

(async () => {
  try {
    const movies = await fetchRandomMovie();
    displayBlock(movies);
  } catch (error) {
    console.error("error fetching random movie", error);
  }
})();
