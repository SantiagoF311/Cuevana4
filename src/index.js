//const getButton = querySelector("#ButtonModal");
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
console.log(contentModal);
const clickWindow=0;


fetch(URL)
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
    buttonAddWath.addEventListener('click', function(){
        localStorage.setItem("watch-video", baseData);
    });

    /*Peliculas en cola*/
    buttonAddQueue.addEventListener('click', function(){
        localStorage.setItem("queue_movie", baseData); 
    });

    

})


if(document.querySelector("#ButtonModal")){

    var modal = document.querySelector("#myModal");
    var button = document.querySelector("#ButtonModal");
    var closeButton= document.querySelector(".button_close");
    

    button.addEventListener("click", ()=>{
        modal.style.display="block";
    })
    
    closeButton.addEventListener("click", ()=>{
        modal.style.display="none";
    })

    document.addEventListener("keydown", (event)=>{
        event.preventDefault();
        if(event.code==='Escape'){
            modal.style.display="none";
        }
    })

    modal.addEventListener('click',()=>{
        modal.style.display="none";
    })

    contentModal.addEventListener('click', (event)=>{
        event.stopPropagation();
        //console.log("content-modal");
    })

}
