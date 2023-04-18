// Seccion que solicita las peliculas mas populares
export const API_KEY = '2c16d3527aa463666a5b1d2730c96dac';
export const URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;
export const contenedorPeliculas = document.getElementById('peliculas');
export var modal = document.querySelector('#myModal');
import { createModal } from './modalMovies.js';

export function mostrarPeliculas(peliculas) {
  let peliculaDiv;

  console.log(peliculas);
  contenedorPeliculas.innerHTML = '';
  peliculas.forEach(pelicula => {
    const imagen = document.createElement('img');
    imagen.src = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
    imagen.alt = pelicula.title;
    imagen.classList.add('pelicula__imagen');

    imagen.addEventListener('click', () => {
      // Actualizar contenido del modal con información de la película
      

      /*
      modalToShow.style.display = 'block';*/

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

      let peliculaDiv = document.createElement('div');
      peliculaDiv.classList.add('pelicula');
      peliculaDiv.appendChild(imagen);
      peliculaDiv.appendChild(titulo);
      peliculaDiv.appendChild(genero);
      peliculaDiv.appendChild(estreno);

      const targetModal = peliculaDiv.getAttribute('data-target');
      const modalToShow = document.querySelector(`#${targetModal}`);

      modalToShow.querySelector('.modal__titulo').textContent = pelicula.title;
      modalToShow.querySelector('.modal__genero').textContent = obtenerGeneros(
        pelicula.genre_ids
      );
      modalToShow.querySelector('.modal__sinopsis').textContent =
        pelicula.overview;
      modalToShow.querySelector('.modal__estreno').textContent = new Date(
        pelicula.release_date
      ).getFullYear();
      modalToShow.querySelector(
        '.modal__imagen'
      ).src = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;

      contenedorPeliculas.appendChild(peliculaDiv);

      imagen.addEventListener('click', function informacionModal() {
        localStorage.setItem('pelicula', JSON.stringify(pelicula));
        createModal();
      });
    });
    /////

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
    peliculaDiv.setAttribute('data-target', 'myModal');
    peliculaDiv.appendChild(imagen);
    peliculaDiv.appendChild(titulo);
    peliculaDiv.appendChild(genero);
    peliculaDiv.appendChild(estreno);

    contenedorPeliculas.appendChild(peliculaDiv);
  });
}

export function obtenerGeneros(idsGeneros) {
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
