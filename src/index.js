// Seccion que solicita las peliculas mas populares
import { URL_POPULARES, mostrarPeliculas } from './js/PelisPopulares.js';
import { searcher, searcherList, API_KEY } from './js/searcher.js';

fetch(URL_POPULARES)
  .then(response => response.json())
  .then(data => mostrarPeliculas(data.results))
  .catch(error => console.log(error));

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
