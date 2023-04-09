let apiKey = '35fb5b52b64fdf4959614d6ee6963661&language=en-US&page=';
let currentPage = '1';
const moviesPerPage = '20';
const url =
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}` + page;
fetch(url)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    const movieInfo = document.querySelector('#prueba');

    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.innerHTML = `
      <h2>${movie.title}</h2>`;

      movieInfo.appendChild(movieElement);
    });

    const pagesButton = document.querySelector('#pages');
    pagesButton.addEventListener('click', () => {
      page++;
      console.log(page);
      console.log(url);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
