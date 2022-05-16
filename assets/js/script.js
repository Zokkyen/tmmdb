/* Reading of JSON File */

let moreInfo = new Array;
let titleMovie = new Array;
let idInfo = 0;

/*---------- Loading animation program ----------*/ 
let theMainContent = document.getElementById('mainContent');
let theMySpinner = document.getElementById('mySpinner');
let vCounter = document.getElementById('vCounter');
let logoCopy =  document.getElementById('logoCopy');

/* Animation value at start */
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
        window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const obj = document.getElementById("vCounter");
animateValue(obj, 0, 100, 2000);

/* Loading animations */
setTimeout(function(){ 
    theMainContent.style.display = "flex";
    logoCopy.style.display = "flex";
    theMySpinner.style.display = "none";
    vCounter.style.display = "none";
}, 2500);

theMainContent.style.display = "none";
logoCopy.style.display = "none";
theMySpinner.style.display = "block";
vCounter.style.display = "block";

/* Principal code */
fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=804fd7354daa8f7c33da449feb49887d&language=fr').then(response => {
    return response.json();
}).then(data => {
    let content = document.getElementById('mainContent');

    /* For each movies */
    for(let i = 0; i < data.results.length; i++){ 
        /* add a new card */
        content.innerHTML += `<div class="card" id="movie${i}"></div>`;

        /* affect the div in HTML and the picture on the left */
        let myCard = document.getElementById(`movie${i}`);
            myCard.innerHTML += `<div class="picture" id="picture${i}"></div>`;
    
        let myPict = document.getElementById(`picture${i}`);
            myPict.style.background = `url(https://image.tmdb.org/t/p/w500${data.results[i].poster_path})`;

            myPict.style.backgroundSize = '100% 100%';
    
        /* affect the div in HTML and the information part on the right */
        myCard.innerHTML += `<div class="infos" id="infos${i}"></div>`;
        
        /* Add the title in info part */
        let myInfos = document.getElementById(`infos${i}`);
        myInfos.innerHTML += `<h2>${data.results[i].title} (${data.results[i].release_date.slice(0,4)})</h2>`;
        titleMovie[i] = `${data.results[i].title}`;
        let myH2 = document.querySelector('h2');
        myH2.style.fontStyle = 'italic';
        myH2.style.fontWeight = 'bold';
        myH2.style.fontSyze = '4vh';
    
        /* add the resume in info part */
        let lenOverview = data.results[i].overview.length;
        if(lenOverview > 100){
            myInfos.innerHTML += `<p>${data.results[i].overview.slice(0, 100)}</p>`;
        }
        else{
            myInfos.innerHTML += `<p>${data.results[i].overview.split(".", 1)}.</p>`;
        }
        moreInfo[i] = data.results[i].overview;

        /*add a more information link with modal to view all the text */
        if(data.results[i].overview != ""){
            myInfos.innerHTML += `<button type="button" class="infoButton" id="button${i}">+ d'infos</button>`;
        } 
    
        /* calcul the average note and transform to 1-5 stars */
        myInfos.innerHTML += `<div id="note${i}"></div>`;
        let vote = document.getElementById(`note${i}`);
        let note = Math.round(data.results[i].vote_average, 1.0)/2;
        for(let j = 0; j < note; j++){
            vote.innerHTML += '☆';
        }
    }
}).catch(err => {
    alert("Erreur du chargement du JSON")
});

/* Add a event listener for a more Info button is clicked */
window.addEventListener('click', (event) => {
    if(event.target.className != 'close'){
        
        /* Obtain number of indice of the ID*/
        let matches = event.target.id.match(/(\d+)/);
        if (matches) {
            idInfo = matches[0];

            /* Add title movie on modal */
            let tMovie = document.getElementById('titleMovie');
            tMovie.innerText = titleMovie[idInfo];

            /* Add the full resume on modal */
            let mInfo = document.getElementById('moreInfo');
            mInfo.innerText =  moreInfo[idInfo]; 

            myModal.style.display = "block";
        }
    }
    else{
        myModal.style.display = "none";
    }
});

/* close the modal when click outside the modal */
window.addEventListener('click', (event) => {
    if (event.target == myModal) {
        myModal.style.display = "none";
    }    
})

let myModal = document.getElementById("myModal");

/* Add Dark Mode */
let darkMode = document.getElementById('darkMode');
darkMode.addEventListener('click', () => {
    
    let mainContent = document.getElementById('mainContent');
    if(mainContent.style.backgroundColor != "black"){
        mainContent.style.backgroundColor = "black";
    }
    else{
        mainContent.style.backgroundColor = "white";
    }

    let cards = document.querySelectorAll('.card')
    cards.forEach(element => {
        if(element.style.backgroundColor != "black"){
            element.style.backgroundColor = "black";
        }
        else{
            element.style.backgroundColor = "white";
        }
        if(element.style.border != "1px solid rgb(254, 204, 0)"){
            element.style.border = "1px solid rgb(254, 204, 0)";
        }
        else{
            element.style.border = "0px";
        }
        if(element.style.color != "white"){
            element.style.color = "white";
        }
        else{
            element.style.color = "black";
        }
    });

    let infoButton = document.querySelectorAll('.infoButton');
    infoButton.forEach(element => {
        if(element.style.color != "black"){
            element.style.color = "black";
        }
        else{
            element.style.color = "white";
        }
        if(element.style.backgroundColor != "rgb(254, 204, 0)"){
            element.style.backgroundColor = "rgb(254, 204, 0)";
        }
        else{
            element.style.backgroundColor = "black";
        }        
    });

    let bkgdModal = document.querySelector('.modal-content');
    if(bkgdModal.style.backgroundColor != "black"){
        bkgdModal.style.backgroundColor = "black";
    }
    else{
        bkgdModal.style.backgroundColor = "white";
    }

    let titleMovie = document.getElementById('titleMovie');
    if(titleMovie.style.color != "white"){
        titleMovie.style.color = "white";
    }
    else{
        titleMovie.style.color = "black";
    }

    let moreInfo = document.getElementById('moreInfo');
    if(moreInfo.style.color != "white"){
        moreInfo.style.color = "white";
    }
    else{
        moreInfo.style.color = "black";
    }
})