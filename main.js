const API_KEY = "ad8ca903";
const search = document.querySelector(".search");

const getSearchData = async (value) => {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${value}`
  );
  const data = await res.json();
  //   console.log(data.search);
  return data;
};

const showSearchResults = async (e) => {
  let busqueda;
  let movies;
  if (e.target.value.length < 3) return;
  busqueda = e.target.value;
  movies = await getSearchData(busqueda);
  console.log(movies.Search);
};
const init = () => {
  search.addEventListener("input", showSearchResults);
};

init();
