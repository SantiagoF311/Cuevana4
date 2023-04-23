import { mostrarPeliculas, obtenerGeneros } from './js/PelisPopulares.js';
import { createModal } from './js/modal.js';
import { searcher, searcherList, API_KEY } from './js/searcher.js';
import { searchedBaseURL, showSearchedMovies } from './js/showMoviesSearch.js';

let URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;

fetch(URL_POPULARES)
  .then(response => response.json())
  .then(data => {
    mostrarPeliculas(data.results);
  })
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

async function searchMovies(query) {
  const searchedBaseURL = 'https://api.themoviedb.org/3/search/movie';
  const url = `${searchedBaseURL}?api_key=${API_KEY}&query=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  mostrarPeliculas(data.results);
}

searcher.addEventListener('input', () => {
  const query = searcher.value.trim();
  if (query.length > 0) {
    searchMovies(query);
  } else {
    return window.location.reload();
  }
});

// Solicitar Datos de las Peliculas a la API

const API_KEY = '2c16d3527aa463666a5b1d2730c96dac';

const contenedorPeliculas = document.getElementById('peliculas');

let paginaActual = 1;
let totalPaginas = 50;

//Muestra las peliculas en la pagina principal

function actualizarPaginacion() {
  const paginacion = document.getElementById('paginacion');
  paginacion.innerHTML = '';

  // Establecer límites inferior y superior para los botones de la paginación
  let limiteInferior = Math.max(paginaActual - 2, 1);
  let limiteSuperior = Math.min(paginaActual + 2, totalPaginas);

  // Asegurarse de que se muestren siempre cinco botones de paginación
  while (limiteSuperior - limiteInferior < 4 && limiteInferior > 1) {
    limiteInferior--;
  }
  while (limiteSuperior - limiteInferior < 4 && limiteSuperior < totalPaginas) {
    limiteSuperior++;
  }

  // Crear los botones de página
  for (let i = limiteInferior; i <= limiteSuperior; i++) {
    const boton = document.createElement('button');
    boton.textContent = i;
    boton.classList.add('pagina');

    if (i === paginaActual) {
      boton.classList.add('pagina-actual');
    }
    boton.addEventListener('click', () => {
      cargarPagina(i);
    });
    paginacion.appendChild(boton);
  }
}

function cargarPagina(pagina) {
  URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${pagina}`;
  fetch(URL_POPULARES)
    .then(respuesta => respuesta.json())
    .then(datos => {
      mostrarPeliculas(datos.results);
      
      paginaActual = datos.page;
      totalPaginas = datos.total_pages;
      actualizarPaginacion();
    });
    
}

cargarPagina(paginaActual);






    
    
