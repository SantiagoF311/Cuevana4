import { searcher, searcherList, API_KEY } from './js/searcher.js';
import { searchedBaseURL, showSearchedMovies } from './js/showMoviesSearch.js';
let URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;

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

//MODAL

const apiKey = '20979babc91cbc65cdd918b0c714bda3';
const URL = `https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}`;
const imageMovie = document.querySelector('.movie_img');
const titleMovie = document.querySelector('.movie_title');
const dataKey = document.querySelector('.data_key');
const dataValue = document.querySelector('.data_value');
const dataSinopsis = document.querySelector('.data_sinopsis');
const arraySubtitles = [
  'Vote / Votes',
  'Popularity',
  'Original Title',
  'Genre',
];
const buttonAddWath = document.querySelector('.video');
const buttonAddQueue = document.querySelector('.movie');
const contentModal = document.querySelector('.sub-content');
const clickWindow = 0;
const orangeColor = '#FF6B01';
const whiteColor = 'white';
const blackColor = 'black';

fetch(URL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    const vote = Number.parseFloat(data.vote_average).toFixed(1);
    const popularity = Number.parseFloat(data.popularity).toFixed(1);
    const originalTitle = data.original_title.toUpperCase();

    const arraySubtValue = [
      vote + ' / ' + data.vote_count,
      popularity,
      originalTitle,
      data.genres,
    ];
    imageMovie.src = `https://image.tmdb.org/t/p/w200${data.poster_path}`;
    titleMovie.textContent = arraySubtValue[2];

    for (let i = 0; i < arraySubtitles.length; i++) {
      const subtitle = document.createElement('p');
      subtitle.style.padding = '6% 0%';
      subtitle.style.margin = '0%';
      subtitle.textContent = `${arraySubtitles[i]}`;
      dataKey.appendChild(subtitle);
      const subtitleValue = document.createElement('p');
      subtitleValue.style.width = 'fit-content';
      subtitleValue.classList = 'data_info';

      if (arraySubtitles[i] === 'Genre') {
        const divGenre = document.createElement('div');
        divGenre.classList.add('data_genre');
        dataValue.appendChild(divGenre);
        data.genres.forEach(genre => {
          const addGenre = document.createElement('p');
          addGenre.style.width = 'fit-content';
          addGenre.classList = 'data_info';
          addGenre.textContent = `${genre.name}`;
          divGenre.appendChild(addGenre);
        });
      } else {
        subtitleValue.textContent = `${arraySubtValue[i]}`;
        dataValue.appendChild(subtitleValue);
      }
    }
    //Sinopsis
    const sinopsis = data.overview;
    dataSinopsis.textContent = `${sinopsis}`;

    //Datos en formato JSON
    const baseData = JSON.stringify(data);

    //habilitar botones

    function changeButton(button, background, letter, border) {
      button.style.backgroundColor = background;
      button.style.color = letter;
      button.style.borderColor = border;
    }

    /*Videos vistos*/
    buttonAddWath.addEventListener('click', function () {
      localStorage.setItem('watch-video', baseData);
      localStorage.removeItem('queue_movie');
      changeButton(buttonAddWath, orangeColor, whiteColor, whiteColor);
      changeButton(buttonAddQueue, whiteColor, blackColor, blackColor);
    });

    /*Peliculas en cola*/
    buttonAddQueue.addEventListener('click', function () {
      localStorage.setItem('queue_movie', baseData);
      localStorage.removeItem('watch-video');
      changeButton(buttonAddQueue, orangeColor, whiteColor, whiteColor);
      changeButton(buttonAddWath, whiteColor, blackColor, blackColor);
    });
  });

if (document.querySelector('#ButtonModal')) {
  const modal = document.querySelector('.modalContainer');
  const button = document.querySelector('#ButtonModal');
  const closeButton = document.querySelector('.button_close');

  button.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  /*Cierre del modal*/

  contentModal.addEventListener('click', event => {
    event.stopPropagation();
  });
}

window.onload = function () {
  const modal = document.querySelector('.modalContainer');
  const peliculas = document.querySelectorAll('.pelicula');
  console.log(peliculas);

  peliculas.forEach(pelicula => {
    pelicula.addEventListener('click', () => {
      const targetModal = pelicula.getAttribute('data-target');
      const modalToShow = document.querySelector(`#${targetModal}`);

      modalToShow.style.display = 'block';
    });
  });

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      modal.style.display = 'none';
    }
  });

  const closeButton = document.querySelector('.button_close');
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
};

// Solicitar Datos de las Peliculas a la API

// Solicitar Datos de las Peliculas a la API

const API_KEY = '2c16d3527aa463666a5b1d2730c96dac';

const contenedorPeliculas = document.getElementById('peliculas');

let paginaActual = 1;
let totalPaginas = 50;

//Muestra las peliculas en la pagina principal

function mostrarPeliculas(peliculas) {
  contenedorPeliculas.innerHTML = '';
  let count = 0;
  peliculas.forEach(pelicula => {
    if (count < 18) {
      const imagen = document.createElement('img');
      imagen.src = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
      imagen.alt = pelicula.title;
      imagen.classList.add('pelicula__imagen');

      const titulo = document.createElement('h2');
      titulo.textContent = pelicula.title;
      titulo.classList.add('pelicula__titulo');

      const sinopsis = document.createElement('p');
      sinopsis.textContent = pelicula.overview;
      sinopsis.classList.add('pelicula__sinopsis');

      const genero = document.createElement('p');
      genero.textContent = `${obtenerGeneros(pelicula.genre_ids)} |`;
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
      count++;
    } else {
      return;
    }
  });
}

function obtenerGeneros(idsGeneros) {
  const generos = {
    28: 'Acción',
    12: 'Aventura',
    16: 'Animación',
    35: 'Comedia',
    80: 'Crimen',
    99: 'Documental',
    18: 'Drama',
    10751: 'Familiar',
    14: 'Fantasía',
    36: 'Historia',
    27: 'Terror',
    10402: 'Música',
    9648: 'Misterio',
    10749: 'Romance',
    878: 'Ciencia ficción',
    10770: 'Película de TV',
    53: 'Suspense',
    10752: 'Bélica',
    37: 'Western',
  };

  const generosPelicula = idsGeneros.map(id => generos[id]);

  return generosPelicula.join(', ');
}

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
