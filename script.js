let api =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=49d477499c100bcc1277457c83b1d644";
let moviearr = [];
let template = document.querySelector(".template-movie");
let container = document.querySelector(".container");

async function fetchMovies() {
  try {
    let response = await fetch(api);
    let data = await response.json();

    data.results.forEach((movie) => {
      let movieElement = template.content.cloneNode(true).children[0];
      let poster = movieElement.querySelector(".poster");
      let movieTitle = movieElement.querySelector(".movie-title");
      let plot = movieElement.querySelector(".plot");
      let year = movieElement.querySelector(".year");

      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      poster.alt = movie.title;
      movieTitle.textContent = movie.title;
      plot.textContent = movie.overview;
      year.textContent = `Year: ${movie.release_date.split("-")[0]}`;

      moviearr.push({
        title: movie.title.toLowerCase(),
        year: movie.release_date.split("-")[0],
        element: movieElement,
      });

      container.appendChild(movieElement);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

fetchMovies();

let search = document.getElementById("searchbar");

search.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();

  moviearr.forEach((movie) => {
    let isVisible = movie.title.includes(value) || movie.year.includes(value);
    movie.element.classList.toggle("hide", !isVisible);
  });
});
