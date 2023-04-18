import { mostrarPeliculas, obtenerGeneros } from './js/PelisPopulares.js';
import { createModal } from './js/modalMovies.js';
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
  let count = 0;
  movies.forEach(pelicula => {
    //localStorage.setItem('pelicula', )
    if (count < 18) {
      const imagen = document.createElement('img');
      imagen.src = `https://image.tmdb.org/t/p/w500${pelicula.poster}`;
      imagen.alt = pelicula.title;
      imagen.classList.add('pelicula__imagen');

      const titulo = document.createElement('h2');
      titulo.textContent = pelicula.title;
      titulo.classList.add('pelicula__titulo');

      const sinopsis = document.createElement('p');
      sinopsis.textContent = pelicula.overview;
      sinopsis.classList.add('pelicula__sinopsis');

      const genero = document.createElement('p');
      genero.textContent = `${obtenerGeneros(pelicula.genres)} |`;
      genero.classList.add('pelicula__genero');
      genero.style.display = 'inline-block';

      const estreno = document.createElement('p');
      estreno.textContent = ` ${new Date(pelicula.release_date).getFullYear()}`;
      estreno.classList.add('pelicula__estreno');
      estreno.style.display = 'inline-block';

      const peliculaDiv = document.createElement('div');
      peliculaDiv.classList.add('pelicula');
      peliculaDiv.appendChild(imagen);
      peliculaDiv.appendChild(titulo);
      peliculaDiv.appendChild(genero);
      peliculaDiv.appendChild(estreno);

      contenedorPeliculas.appendChild(peliculaDiv);

      imagen.addEventListener('click', function informacionModal() {
        localStorage.setItem('pelicula', JSON.stringify(pelicula));
        createModal();
      });
      count++;
    } else {
      return;
    }
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
