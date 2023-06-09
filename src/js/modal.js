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
const buttonprueba = document.querySelector('.button');
export let getSubtitle, getSubtitleValue;
const orangeColor = '#FF6B01';
const whiteColor = 'white';
const blackColor = 'black';
import { obtenerGeneros } from './PelisPopulares.js';

export function createModal() {
  appearModal();
  const data = JSON.parse(localStorage.getItem('pelicula'));
  putData(data);
}

function putData(data) {
  console.log('data: ', data);
  const vote = data.vote_average;
  const popularity = Number.parseFloat(data.popularity).toFixed(1);
  const originalTitle = data.title.toUpperCase();
  const voteCount = data.vote_count;
  const genres = data.genre_ids;
  const arraySubtValue = [
    vote + ' / ' + voteCount,
    popularity,
    originalTitle,
    genres,
  ];

  imageMovie.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  titleMovie.textContent = originalTitle;

  for (let i = 0; i < arraySubtitles.length; i++) {
    console.log('longitud', arraySubtitles.length);
    const subtitle = document.createElement('p');
    subtitle.classList = 'data_info-subtitle';
    subtitle.style.padding = '6% 0%';
    subtitle.style.margin = '0%';
    subtitle.textContent = `${arraySubtitles[i]}`;
    dataKey.appendChild(subtitle);
    const subtitleValue = document.createElement('p');
    subtitleValue.style.width = 'fit-content';
    subtitleValue.classList = 'data_info';

    if (arraySubtitles[i] === 'Genre') {
      /*Genres*/
      const divGenre = document.createElement('div');
      divGenre.classList.add('data_genre');
      dataValue.appendChild(divGenre);
      const addGenre = document.createElement('p');
      addGenre.style.width = 'fit-content';
      addGenre.classList = 'data_info';
      addGenre.textContent = `${obtenerGeneros(data.genre_ids)} `;
      divGenre.appendChild(addGenre);
    } else {
      subtitleValue.textContent = `${arraySubtValue[i]}`;
      dataValue.appendChild(subtitleValue);
    }

    //localStorage.removeItem('pelicula');
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
    localStorage.setItem(`whatch-${data.original_title}`, baseData);
    localStorage.removeItem(`Queue-${data.original_title}`);
    changeButton(buttonAddWath, orangeColor, whiteColor, whiteColor);
    changeButton(buttonAddQueue, whiteColor, blackColor, blackColor);
  });

  /*Peliculas en cola*/
  buttonAddQueue.addEventListener('click', function () {
    localStorage.setItem(`Queue-${data.original_title}`, baseData);
    localStorage.removeItem(`whatch-${data.original_title}`);
    changeButton(buttonAddQueue, orangeColor, whiteColor, whiteColor);
    changeButton(buttonAddWath, whiteColor, blackColor, blackColor);
  });
}

/*fetch(URL)
.then(response=>{
    return response.json();
})
.then(data=>{
    console.log(data);
    const vote=Number.parseFloat(data.vote_average).toFixed(1);
    const popularity=Number.parseFloat(data.popularity).toFixed(1);
    const originalTitle=data.original_title.toUpperCase();
    
    const arraySubtValue=[vote + " / "+ data.vote_count,popularity,originalTitle,data.genres];
    imageMovie.src=`https://image.tmdb.org/t/p/w200${data.poster_path}`;
    titleMovie.textContent=arraySubtValue[2];

    for(let i=0; i<arraySubtitles.length; i++){

        const subtitle=document.createElement("p");
        //subtitle.classList='data_info';
        subtitle.style.padding='6% 0%';
        subtitle.style.margin='0%';
        subtitle.textContent=`${arraySubtitles[i]}`
        dataKey.appendChild(subtitle);
        const subtitleValue=document.createElement("p");
        subtitleValue.style.width='fit-content';
        subtitleValue.classList='data_info';

        if(arraySubtitles[i]==="Genre"){
            console.log(arraySubtitles[i]);
            const divGenre=document.createElement('div');
            divGenre.classList.add('data_genre');
            dataValue.appendChild(divGenre);
            data.genres.forEach(genre=>{
                const addGenre=document.createElement('p');
                addGenre.style.width='fit-content';
                addGenre.classList='data_info';
                addGenre.textContent=(`${genre.name}`);
                divGenre.appendChild(addGenre);
            });
        }else{

            subtitleValue.textContent=`${arraySubtValue[i]}`;
            dataValue.appendChild(subtitleValue);
        }
       

    }   
    //Sinopsis
    const sinopsis= data.overview;
    dataSinopsis.textContent=`${sinopsis}`;

    //Datos en formato JSON
    const baseData=JSON.stringify(data);
    
    
    /*Videos vistos*/
/*buttonAddWath.addEventListener('click', function(){
        localStorage.setItem("watch-video", baseData);
    });

    /*Peliculas en cola*/
/*buttonAddQueue.addEventListener('click', function(){
        localStorage.setItem("queue_movie", baseData); 
    });

    

})*/

function appearModal() {
  //const container= document.querySelector('.container');
  //container.style.background = 'linear-gradient(to right, #ff0000, #00ff00)';

  var modal = document.querySelector('#myModal');
  var closeButton = document.querySelector('.button_close');
  modal.style.display = 'block';

  closeButton.addEventListener('click', () => {
    dataKey.innerHTML = '';
    dataValue.innerHTML = '';
    modal.style.display = 'none';
  });

  document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code === 'Escape') {
      dataKey.innerHTML = '';
      dataValue.innerHTML = '';
      modal.style.display = 'none';
    }
  });

  modal.addEventListener('click', () => {
    dataKey.innerHTML = '';
    dataValue.innerHTML = '';
    modal.style.display = 'none';
  });

  contentModal.addEventListener('click', event => {
    event.stopPropagation();
    //console.log("content-modal");
  });
}
