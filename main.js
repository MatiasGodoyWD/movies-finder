const API_KEY = "ad8ca903";
const search = document.querySelector(".search");
const dropdown = document.querySelector(".dropdown");
const dropdownContent = dropdown.querySelector(".dropdown-content");
const container = document.querySelector(".container");

/* --------------------Data fetchers-------------------- */
const getSearchData = async (value) => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${value}`
  );
  const data = await res.json();

  return data.Search;
};

const getMovieById = async (id) => {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`
  );
  const data = await res.json();

  return data;
};

/* --------------------Dom modifiers-------------------- */

const showSearchResults = async (e) => {
  e.preventDefault();
  let searchValue;
  let movies;
  if (e.target.value.length < 3) {
    dropdown.classList.remove("is-active");
    return;
  }
  searchValue = e.target.value;
  movies = await getSearchData(searchValue);
  console.log(movies);
  dropdown.classList.add("is-active");
  dropdownContent.innerHTML = `
   ${
     !movies
       ? `<li class="dropdown-item">
   'No existen peliculas que cumplan con la busqueda realizada'
 </li>`
       : movies
           .map((movie) => {
             return `<li data-id="${
               movie.imdbID
             }" class="dropdown-item is-flex is-align-items-center is-clickable is-size-4 is-size-5-mobile">
    <img class="image is-32x32 mr-5" src="${
      movie.Poster !== "N/A" ? movie.Poster : "./img/no-image.jpg"
    }">  ${movie.Title}
  </li>`;
           })
           .join("")
   }
  `;
};

const showMovie = async (e) => {
  if (e.target.nodeName !== "LI") return;
  const card = container.querySelector(".card");
  if (card) {
    container.removeChild(card);
  }
  const id = e.target.dataset.id;
  const movie = await getMovieById(id);
  console.log(movie);
  dropdown.classList.remove("is-active");
  search.value = "";
  let newCard = document.createElement("div");
  newCard.classList.add(
    "card",
    "is-flex",
    "is-flex-direction-row-desktop",
    "mt-6"
  );
  newCard.innerHTML = `

  
  <div class="card-image">
    <img
      class="img"
      src="${movie.Poster !== "N/A" ? movie.Poster : "./img/no-image.jpg"}"
      alt="Placeholder image"
    />
  </div>
  <div
    class="
      card-content
      is-flex
      is-align-items-center
      is-flex-direction-column
      is-justify-content-space-around
    "
  >
    <p class="title is-3">${movie.Title}</p>
    <p class="subtitle is-6">${movie.Year}</p>

    <div class="content has-text-centered">
     ${
       movie.Plot !== "N/A"
         ? movie.Plot
         : "The plot of this movie is currently unavailable."
     }
    </div>
    <footer class="card-footer">
      <li href="#" class="card-footer-item">
        <strong class="mr-2">Duration:</strong> ${movie.Runtime}
      </li>
      <li href="#" class="card-footer-item">
        <strong class="mr-2">Director:</strong> ${movie.Director}
      </li>
      <li href="#" class="card-footer-item">
        <strong class="mr-2">Imdb rating:</strong> ${movie.imdbRating}
      </li>
    </footer>
  </div>

  `;
  container.appendChild(newCard);
};

/* --------------------Initializers-------------------- */
const init = () => {
  search.addEventListener("input", showSearchResults);
  dropdownContent.addEventListener("click", showMovie);
};

init();
