if(document.querySelector("#ButtonModal")){

    var modal = document.querySelector("#myModal");
    var button = document.querySelector("#ButtonModal");
    var closeButton= document.querySelector("#close");


    button.addEventListener("click", ()=>{
        modal.style.display="block";
    })
    
    closeButton.addEventListener("click", ()=>{
        modal.style.display="none";
    })
    
}
