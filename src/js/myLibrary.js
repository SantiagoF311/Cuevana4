import { createModal } from './modalMovies.js';
const containery = document.getElementById('peliculas');
let tabSelected = 0;
let buttonWatch = document.querySelector('button');
let buttonQueue = document.getElementById('button_Queue');
let clearList = document.getElementById('resett');
console.log('buttoonWatch', buttonWatch); //null
let localPelisWatch = JSON.parse(localStorage.getItem('watch-movies'));
let localPelisQueue = JSON.parse(localStorage.getItem('queue-movies'));
console.log('localPelisWatch', localPelisWatch);
if(localPelisWatch==null){
    localPelisWatch=[]
}
if(localPelisQueue==null){
    localPelisQueue=[]
}

const noContenttt= document.getElementById('peliculas')



clearList.addEventListener('click', event => {
  event.preventDefault();
  console.log('clearlist');
  if (tabSelected == 1) {
    localStorage.removeItem('watch-movies');
    localPelisWatch = [];
    
    const noContent = document.createElement('div');
    noContenttt.classList = 'no-content';
    noContenttt.appendChild(noContent);

    PeliculasMyLibrary(localPelisWatch);
    if (localPelisWatch.length == 0) {
      containery.innerHTML =
        "Empty List";
    }
    /* localStorage.setItem('pelicula', JSON.stringify(pelicula)); */
  }
  if (tabSelected == 2) {
    localStorage.removeItem('queue-movies');
    localPelisQueue = [];
    PeliculasMyLibrary(localPelisQueue);
    if (localPelisQueue.length == 0) {
      containery.innerHTML =
        "Empty List";
    }
  }
});

buttonWatch.addEventListener('click', event => {
  event.preventDefault();
  console.log('click');
  tabSelected = 1;
  if (localPelisWatch.length == 0) {
    containery.innerHTML =
      "Empty List";
  } else {
    PeliculasMyLibrary(localPelisWatch);
  }
});
buttonQueue.addEventListener('click', event => {
  event.preventDefault();
  console.log('click');
  tabSelected = 2;
  if (localPelisQueue.length == 0) {
    containery.innerHTML =
      "Empty List";
  } else {
    PeliculasMyLibrary(localPelisQueue);
  }
});

function PeliculasMyLibrary(peliculas) {
  //console.log(peliculas);
  containery.innerHTML = '';
  peliculas.forEach(pelicula => {
    //localStorage.setItem('pelicula', )

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

    containery.appendChild(peliculaDiv);

    imagen.addEventListener('click', function informacionModal() {
      localStorage.setItem('pelicula', JSON.stringify(pelicula));
      createModal();
    });
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
