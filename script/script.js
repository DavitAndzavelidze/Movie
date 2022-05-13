// -------------Variables-------------
const API_KEY = "api_key=bc7575ffebd6a5621c04fd747306d509";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// -----------Get Movie API url------------
getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}
// -------Change HTML content with new movie API-----
function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${IMG_URL + poster_path}" alt="${title}"/>
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>overview</h3>
      ${overview}
    </div>`;

    main.appendChild(movieEl);
  });
}
// ----------- Change movie rating color------------
function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
// -----------Show search movie and get new query-----
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

// ----------Scroll smooth at the top-----------
document.querySelector("#arrow").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("arrow__up")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

// ---------Scroll arrow appearence later-----------
const header = document.getElementById("header");
const arrowUp = document.getElementById("arrow");

const stickyArrow = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) arrowUp.classList.remove("arrow__hidden");
  else arrowUp.classList.add("arrow__hidden");
};

const headerObserver = new IntersectionObserver(stickyArrow, {
  root: null,
  threshold: 0,
});
headerObserver.observe(header);
