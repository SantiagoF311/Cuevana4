const apiKey = '20979babc91cbc65cdd918b0c714bda3';
const URL= `https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}`;
const imageMovie=document.querySelector(".movie_img");
const titleMovie=document.querySelector(".movie_title");
const dataKey= document.querySelector('.data_key');
const dataValue=document.querySelector('.data_value');
const dataSinopsis = document.querySelector('.data_sinopsis');
const arraySubtitles=["Vote / Votes","Popularity","Original Title","Genre"];
const buttonAddWath=document.querySelector('.video');
const buttonAddQueue=document.querySelector('.movie');
const contentModal=document.querySelector('.sub-content');
const buttonprueba= document.querySelector('.button');
export let getSubtitle, getSubtitleValue;
const watchMovies=[];
const orangeColor = '#FF6B01';
const whiteColor = 'white';
const blackColor = 'black';
import { obtenerGeneros } from './PelisPopulares.js';




export function createModal(){
    appearModal();
    const data =  JSON.parse(localStorage.getItem('pelicula'));
    console.log("data en creatmodal", data);
    putData(data);
    watch(data);
};

function putData(data){
    //console.log("prueba: ", data);
    const vote=data.vote_average;
    const popularity=Number.parseFloat(data.popularity).toFixed(1);;
    const originalTitle=data.original_title.toUpperCase();
    const voteCount= data.vote_count;
    const genres= data.genre_ids;
    const arraySubtValue=[vote + " / "+ voteCount,popularity,originalTitle,genres];

    imageMovie.src=`https://image.tmdb.org/t/p/w500${data.poster_path}`;
    titleMovie.textContent=originalTitle;

    for(let i=0; i<arraySubtitles.length; i++){

        const subtitle=document.createElement("p");
        subtitle.classList='data_info-subtitle';
        //subtitle.style.padding='4% 0%';
        subtitle.style.margin='0%';
        subtitle.textContent=`${arraySubtitles[i]}`
        dataKey.appendChild(subtitle);
        const subtitleValue=document.createElement("p");
        subtitleValue.style.width='fit-content';
        subtitleValue.classList='data_info';
        
        if(arraySubtitles[i]==="Genre"){
            /*Genres*/
            const divGenre=document.createElement('div');
            divGenre.classList.add('data_genre');
            dataValue.appendChild(divGenre);
            const addGenre=document.createElement('p');
            addGenre.style.width='fit-content';
            addGenre.classList='data_info';
            addGenre.textContent = `${obtenerGeneros(data.genre_ids)} `;
            divGenre.appendChild(addGenre);
            
        }else{
            subtitleValue.textContent=`${arraySubtValue[i]}`;
            dataValue.appendChild(subtitleValue);
            subtitle.style.height=`${subtitleValue.clientHeight}px`;
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
   
    
    /*Peliculas en cola*/
    buttonAddQueue.addEventListener('click', function () {

        data.watch='false';
        data.queue='true';

        localStorage.setItem('data',JSON.stringify(data));
      changeButton(buttonAddQueue, orangeColor, whiteColor, whiteColor);
      changeButton(buttonAddWath, whiteColor, blackColor, blackColor);
    });

}

function watch(data){

    console.log("entro");
    
    buttonAddWath.addEventListener('click', ()=> {
        console.log("data: ", data);
        data.watch='true';
        data.queue='false';
        
        if(watchMovies.length===0){
            watchMovies.push(data);
            console.log("se agrega el primer elemento", watchMovies);
            localStorage.setItem('watch-movies',JSON.stringify(watchMovies));
        }else{
            if(watchMovies.includes(data)){
                console.log("objeto encontrado: ")
            }else{
                watchMovies.push(data);
                console.log("prueba watch", watchMovies)
            }
            
        }

        /*console.log("objeto agregado", watchMovies);
        console.log('local storage;', JSON.parse(localStorage.getItem('watch-movies')) );

        changeButton(buttonAddWath, orangeColor, whiteColor, whiteColor);
        changeButton(buttonAddQueue, whiteColor, blackColor, blackColor);*/
    });

}

function appearModal(){
    var modal = document.querySelector("#myModal");
    var closeButton= document.querySelector(".button_close");
    modal.style.display="block";

    closeButton.addEventListener("click", ()=>{
        dataKey.innerHTML='';
        dataValue.innerHTML='';
        modal.style.display="none";
    })

    document.addEventListener("keydown", (event)=>{
        event.preventDefault();
        if(event.code==='Escape'){
            modal.style.display="none";
            dataKey.innerHTML='';
            dataValue.innerHTML='';
        }
    })

    modal.addEventListener('click',()=>{
        dataKey.innerHTML='';
        dataValue.innerHTML='';
        modal.style.display="none";
    })

    contentModal.addEventListener('click', (event)=>{
        event.stopPropagation();
    })
}



