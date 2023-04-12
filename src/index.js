// Seccion que solicita las peliculas mas populares
import {
  URL_POPULARES,
  contenedorPeliculas,
  mostrarPeliculas,
  obtenerGeneros,
} from './js/PelisPopulares.js';
import { searcher, searcherList, API_KEY } from './js/searcher.js';
import { searchedBaseURL, showSearchedMovies } from './js/showMoviesSearch.js';

fetch(URL_POPULARES)
  .then(response => response.json())
  .then(data => mostrarPeliculas(data.results))
  .catch(error => console.log(error));

 //Input para buscar peliculas

searcher.addEventListener('input', () => {
  const searchQuery = searcher.value;
  const searchUrl = `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${searchQuery}`;

  fetch(searchUrl)
    .then(response => response.json())
    .then(results => {
      searcherList.innerHTML = '';
      let counter = 0;
      results.results.forEach(keyword => {
        if (counter < 4) {
          const listItem = document.createElement('li');
          listItem.setAttribute('class', 'movieName');
          listItem.textContent = keyword.name;
          searcherList.appendChild(listItem);
          counter++;
        } else {
          return;
        }
      });
    })
    .catch(error => console.log(error));
});

const searchedBaseURL = 'https://api.themoviedb.org/3/search/movie';

async function searchMovies(query) {
  const url = `${searchedBaseURL}?api_key=${API_KEY}&query=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  const movies = data.results.map(movie => {
    return {
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      overview: movie.overview,
      genres: movie.genre_ids,
      estreno: movie.release_date,
    };
  });
  contenedorPeliculas.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = `
    <div class="pelicula"
          <div class="movie-card">
            <img src="${movie.poster}" class="pelicula__imagen" alt="${
      movie.title
    }">
            <h2 class="pelicula__titulo">${movie.title}</h2>
            <p  style=display: "inline-block" class="pelicula__genero">${obtenerGeneros(
              movie.genres
            )}</p>
            <p  style=display: "inline-block" class="pelicula__estreno">${
              movie.estreno
            }</p>
          </div>
          </div>
        `;
    contenedorPeliculas.innerHTML += movieCard;
  });
}

searcher.addEventListener('input', () => {
  const query = searcher.value.trim();
  if (query.length > 0) {
    searchMovies(query);
  } else {
    return window.location.reload();
  }
});
