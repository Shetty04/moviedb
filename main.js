const movieContainer = document.querySelector("#movie-container");
const searchField = document.querySelector("#search-input");
const itemsCount = document.querySelector("#itemsCount");

async function fetchRandomMovie() {
  try {
    const apiUrl = `https://www.omdbapi.com/?s=kabhi&apikey=3219c50a`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.error("Error fetching random movies", error);
    return [];
  }
}

searchField.addEventListener("input", async () => {
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
    const apiUrl = `http://www.omdbapi.com/?s=${query}&pageSize=10&apikey=3219c50a`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.error("Error fetching random Movies", error);
    return [];
  }
}

function displayBlock(movies) {
  movieContainer.innerHTML = "";

  itemsCount.textContent = "All()";
  itemsCount.textContent = `All(${movies.length}) `;

  movies.forEach((movie) => {
    const movieOuterCard = document.createElement("div");
    const imdbID = movie.imdbID;
    movieOuterCard.classList.add("outer-card");
    const movieInnerCard = document.createElement("div");
    movieInnerCard.classList.add("inner-card");
    const img = document.createElement("img");
    img.src = movie.Poster;
    img.alt = "poster image";
    img.classList.add("h-[20rem]");
    img.classList.add("w-[14rem]");
    const movieName = document.createElement("div");
    movieName.classList.add("name");
    movieName.classList.add("max-w-[15rem]");
    const title = document.createElement("p");
    title.textContent = movie.Title;
    movieOuterCard.appendChild(movieInnerCard);
    movieOuterCard.appendChild(movieName);
    movieInnerCard.appendChild(img);
    movieName.appendChild(title);
    movieContainer.appendChild(movieOuterCard);
    movieOuterCard.addEventListener("click", () => {
      window.location.href = `movie.html?movieId=${imdbID}`;
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
