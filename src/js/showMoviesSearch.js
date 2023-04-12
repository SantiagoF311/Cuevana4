import { contenedorPeliculas } from './PelisPopulares';
import { searcher } from './searcher';

export const searchedBaseURL = 'https://api.themoviedb.org/3/search/movie';
const apiKey = '2c16d3527aa463666a5b1d2730c96dac';

export function showSearchedMovies(peliculas) {
  async function searchMovies(query) {
    const url = `${searchedBaseURL}?api_key=${apiKey}&query=${query}`;

    const response = await fetch(url);
    const data = await response.json();

    const movies = data.results.map(movie => {
      return {
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
        overview: movie.overview,
      };
    });
    contenedorPeliculas.innerHTML = '';
    movies.forEach(movie => {
      const movieCard = `
          <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title} class="pelicula__imagen"">
            <h2 class="movie__title">${movie.title}</h2>
            <p>${movie.overview}</p>
          </div>
        `;
      resultsContainer.innerHTML += movieCard;
    });
  }

  searcher.addEventListener('input', () => {
    const query = searcher.value.trim();
    if (query.length > 0) {
      searchMovies(query);
    }
  });
}
