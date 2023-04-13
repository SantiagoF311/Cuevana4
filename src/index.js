// Solicitar Datos de las Peliculas a la API

const API_KEY = '2c16d3527aa463666a5b1d2730c96dac';
let URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;
const contenedorPeliculas = document.getElementById('peliculas');

let paginaActual = 1;
let totalPaginas = 50;

//Muestra las peliculas en la pagina principal
function mostrarPeliculas(peliculas) {
    contenedorPeliculas.innerHTML = '';

    peliculas.forEach((pelicula) => {
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

    const generosPelicula = idsGeneros.map((id) => generos[id]);

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
        }boton.addEventListener('click', () => {
            cargarPagina(i);
        });
        paginacion.appendChild(boton);
    }

}

function cargarPagina(pagina) {
    URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${pagina}`;
    fetch(URL_POPULARES)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            mostrarPeliculas(datos.results);
            paginaActual = datos.page;
            totalPaginas = datos.total_pages;
            actualizarPaginacion();
        });
}

cargarPagina(paginaActual);