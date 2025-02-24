let api = "https://www.freetestapi.com/api/v1/movies";
let moviearr = [];
let template = document.querySelector(".template-movie");
let container = document.querySelector(".container");

async function a() {
  let callingapi = await fetch(api);
  let data = await callingapi.json();
  data.map((detalis) => {
    let movie = template.content.cloneNode(true).children[0];
    let poster = movie.querySelector(".poster");
    let movieTitle = movie.querySelector(".movie-title");
    let plot = movie.querySelector(".plot");
    let year = movie.querySelector(".year");
    poster.setAttribute("src", detalis.poster);
    movieTitle.innerHTML = detalis.title;
    plot.innerHTML = detalis.plot;
    year.innerHTML = detalis.year;
    moviearr.push({
      Title: detalis.title,
      year: detalis.year.toString(),
      id: detalis.id,
      container: movie,
    });
    container.append(movie);
  });
}
a();

let search = document.getElementById("searchbar");

search.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  moviearr.forEach((i) => {
    let isvisible =
      i.Title.toLowerCase().includes(value) || i.year.includes(value);
    i.container.classList.toggle("hide", !isvisible);
  });
});
