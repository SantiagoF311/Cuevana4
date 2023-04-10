import {
  API_KEY,
  URL_POPULARES,
  contenedorPeliculas,
  mostrarPeliculas,
  obtenerGeneros,
} from './js/PelisPopulares.js';

fetch(URL_POPULARES)
  .then(response => response.json())
  .then(data => mostrarPeliculas(data.results))
  .catch(error => console.log(error));
