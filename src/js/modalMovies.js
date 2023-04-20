const arraySubtitles=["Vote / Votes","Popularity","Original Title","Genre"];
export let getSubtitle, getSubtitleValue;
//let watchMovies=[];
//localStorage.setItem('watch-movies', watchMovies);
const orangeColor = '#FF6B01';
const whiteColor = 'white';
const blackColor = 'black';
import { obtenerGeneros } from './PelisPopulares.js';
const modal = document.querySelector("#myModal");
var closeButton= document.querySelector(".button_close");
const body=document.querySelector('body');


export function createModal(){
    const data =  JSON.parse(localStorage.getItem('pelicula'));
    console.log("data en creatmodal", data);
    putData(data);
    appearModal();
    watch(data);
};

function putData(data){
    
    console.log('data en putdata;', data);
    const vote=data.vote_average;
    const popularity=Number.parseFloat(data.popularity).toFixed(1);;
    const originalTitle=data.original_title.toUpperCase();
    const voteCount= data.vote_count;
    const genres= data.genre_ids;
    const arraySubtValue=[vote + " / "+ voteCount,popularity,originalTitle,genres];

    /*Creating big modal
    const modal=document.createElement('div');
    modal.id='myModal';
    modal.classList='modalContainer';
    body.appendChild(modal);*/

    //container modal
    const secondModal=document.createElement('div');
    secondModal.classList='modal-content';
    modal.appendChild(secondModal);

    //Creatting close button 

    const closeButton=document.createElement('button');
    closeButton.classList='button_close';
    closeButton.textContent='X';
    secondModal.appendChild(closeButton);

    //Creatting sub-container Modal
    const contentModal=document.createElement('div');
    contentModal.classList='sub-content';
    secondModal.appendChild(contentModal);


    //Creacion de div para la imagen 
    const contentImage=document.createElement('div');
    contentImage.classList='sub-content_data';
    contentModal.appendChild(contentImage);

    //Put image in its div 
    const imageMovie=document.createElement('img');
    imageMovie.classList='movie_img';
    imageMovie.alt=originalTitle;
    imageMovie.src=`https://image.tmdb.org/t/p/w500${data.poster_path}`;
    contentImage.appendChild(imageMovie);

    const subContentInfo=document.createElement('div');
    subContentInfo.classList='sub-content_data info';
    contentModal.appendChild(subContentInfo);
    const titleMovie=document.createElement('h2');
    titleMovie.classList='movie_title';
    titleMovie.textContent=originalTitle;
    subContentInfo.insertAdjacentElement('afterbegin',titleMovie);

    for(let i=0; i<arraySubtitles.length; i++){

        const subtitle=document.createElement("p");
        subtitle.classList='data_info-subtitle';
        subtitle.style.padding='4% 0%';
        subtitle.style.margin='0%';
        subtitle.textContent=`${arraySubtitles[i]}`

        /*Creacion de div para las llaves y valores*/

        const dataMovie=document.createElement('div');
        dataMovie.classList='data_movie';
        const dataKey=document.createElement('div');
        dataKey.classList='data_key';
        dataMovie.appendChild(dataKey);
        const dataValue=document.createElement('div');
        dataValue.classList='data_value';
        dataMovie.appendChild(dataValue);
        subContentInfo.appendChild(dataMovie);


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

    


    //creacion de div para sinopsis y botones
    const divSinopsis=document.createElement('div');

    //ABOUT
    const about=document.createElement('h2');
    about.textContent='ABOUT';
    divSinopsis.appendChild(about);

    //creacion de parrafo y botones 
    const dataSinopsis=document.createElement('p');
    dataSinopsis.classList='data_sinopsis';
    const sinopsis = data.overview;
    dataSinopsis.textContent = `${sinopsis}`;
    divSinopsis.appendChild(dataSinopsis);
    subContentInfo.appendChild(divSinopsis);

    //creacion del div para los botones
    const divButtons=document.createElement('div');
    divButtons.classList='add_info';
    const buttonAddWatch=document.createElement('button');
    buttonAddWatch.classList='add-button video';
    buttonAddWatch.textContent='ADD WATCH';
    const buttonAddQueue=document.createElement('button');
    buttonAddQueue.textContent='ADD QUEUE';
    buttonAddQueue.classList='add-button';
    divButtons.appendChild(buttonAddWatch);
    divButtons.appendChild(buttonAddQueue);
    subContentInfo.appendChild(divButtons);

    

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

       // data.watch='false';
        //data.queue='true';

        localStorage.setItem('data',JSON.stringify(data));
      changeButton(buttonAddQueue, orangeColor, whiteColor, whiteColor);
      changeButton(buttonAddWatch, whiteColor, blackColor, blackColor);
    });

}

function watch(data){
    const buttonAddWatch=document.querySelector('.video');
    let watchMovies=localStorage.getItem('watch-movies');
    let arrayMovies;
    
    
    buttonAddWatch.addEventListener('click', ()=> {

        if(watchMovies===null){
            arrayMovies=[];
            console.log('data button: ', data)
            arrayMovies.push(data);
            console.log('array-movies',arrayMovies);
            localStorage.setItem('watch-movies', JSON.stringify(arrayMovies));
        }else{
            //watchMovies=localStorage.getItem('watch-movies');
            //console.log("ver que trae el local: ", watchMovies);
            const getMovies= JSON.parse(localStorage.getItem("watch-movies"));
            console.log("name del else", getMovies);
            const titles=[];

            getMovies.forEach(movie => {
                console.log("name movie: ", movie.original_title);
                console.log("name data", data.original_title);
                titles.push(movie.original_title); 
            });

            if(titles.includes(data.original_title)){
                console.log('hi');
            }else{
                getMovies.push(data);
                localStorage.setItem('watch-movies',JSON.stringify(getMovies));
            }

        }
        
        
        /*if(watchMovies.length===0){
            data.addWatch=true;
            data.addQueue=false;
            watchMovies.push(data);
            console.log("se agrega el primer elemento", watchMovies);
            localStorage.setItem('watch-movies',JSON.stringify(watchMovies));
        }else{*/
            

            
            
        //}
    });

}

function appearModal(){
 
    const closeButton= document.querySelector(".button_close");
    const secondModal=document.querySelector('.modal-content');
    const contentModal=document.querySelector('.sub-content');
    var modal=document.querySelector(".modalContainer");
    modal.style.display="block";

    closeButton.addEventListener("click", ()=>{
        secondModal.remove();
    })

    document.addEventListener("keydown", (event)=>{
        event.preventDefault();
        if(event.code==='Escape'){
            secondModal.remove();
            modal.style.display="none";
        }
    })

    modal.addEventListener('click',()=>{
        secondModal.remove();
        modal.style.display="none";
    })

    contentModal.addEventListener('click', (event)=>{
        event.stopPropagation();
    })
}

/*function deleteTags(){

}*/


