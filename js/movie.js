// API
const apiKey = 'b952b137c8f2368ab0069e05f47729a0';


//get Movie is called when movie.html opens
function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    let movieType = sessionStorage.getItem('movieType');
    console.log(movieId,movieType);

    //getting general info
    fetch(`https://api.themoviedb.org/3/${movieType}/${movieId}?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => showMovieDetails(data))
    .catch(err => console.log(err));     
}

function showMovieDetails(detail){
    const movieDetails = document.querySelector('.movie-details');
    const details = document.createElement('div');
    details.className = 'details-movie-output';

    let movieType = sessionStorage.getItem('movieType');
    
    if(movieType === 'movie'){
     details.innerHTML = `
        <header class='details-header' style="background-image: url('https://image.tmdb.org/t/p/original${detail.backdrop_path}')">
        <section class='back-arrow'></section>
        <section class='details-title'>
            <h1>${detail.original_title}</h1>
            <p>${detail.status} | ${detail.original_language}</p>
            <p>${detail.genres[0].name}</p>
        </section>
        </header>
        <main class='main-detail'>
            <section class='summary-detail'>
            <h2>Summary</h2>
            <p>${detail.overview}</p>
            </section>
        </main>
    `;} else if(movieType === 'tv'){
        details.innerHTML = `
        <header class='details-header' style="background-image: url('https://image.tmdb.org/t/p/original${detail.backdrop_path}')">
        <section class='back-arrow'></section>
        <section class='details-title'>
            <h1>${detail.name}</h1>
            <p>${detail.status} | ${detail.original_language}</p>
            <p>${detail.genres[0].name} | ${detail.number_of_seasons} Seasons</p>
        </section>
        </header>
        <main class='main-detail'>
            <section class='summary-detail'>
                <h2>Summary</h2>
                <p>${detail.overview}</p>
            </section>
        </main>
    `;
    }

    movieDetails.appendChild(details);
}

//get cast
function getCast(){
    let movieId = sessionStorage.getItem('movieId');
    let movieType = sessionStorage.getItem('movieType');

    if(movieType === 'movie' || movieType === 'tv'){
     //fetching cast and crew for movie 
        fetch(`https://api.themoviedb.org/3/${movieType}/${movieId}/credits?api_key=${apiKey}`)
        .then(res => res.json())
        .then(data => showCast(data.cast))
        .catch(err => console.log(err));
    }
}
//show Movie cast
function showCast(cast){
    //make actors div
    const actors = document.createElement('div');
    actors.className = 'actors'; 
    //get main
    const main = document.querySelector('.main-detail');
    //get summary
    const summary = document.querySelector('.summary-detail');
     //create an h2  
     const header = document.createElement('h2');
     header.className = 'filmCast';
     header.innerHTML = `Cast`;
     main.insertBefore(header,summary.nextSibling);
    //loop through cast
    cast.forEach(person => {
        
        console.log(person);
       
        //make gridActors div
        const gridActors = document.createElement('div');
        gridActors.className = 'actor-grid';
        
        //fill in actors div 
        gridActors.innerHTML = `
            <div class='actor-card'>
                <img class='cast-img' src='https://image.tmdb.org/t/p/original${person.profile_path}' alt="Film's Cast">
                <h3 class='cast-name'>${person.name} as ${person.character}</h3> 
            </div>       
    `;
        actors.appendChild(gridActors);  
        main.appendChild(actors);
    });       
}

// get Trailer
function getTrailer(){
    let movieId = sessionStorage.getItem('movieId');
    let movieType = sessionStorage.getItem('movieType');

    if(movieType === 'movie' || movieType === 'tv'){
     //fetching cast and crew for movie 
        fetch(`https://api.themoviedb.org/3/${movieType}/${movieId}/videos?api_key=${apiKey}`)
        .then(res => res.json())
        .then(data => showTrailers(data.results))
        .catch(err => console.log(err));
    }
}
//show Movie cast
function showTrailers(trailers){
    //make trailers div
    const trailersDiv = document.createElement('div');
    trailersDiv.className = 'trailors'; 
    //get main
    const main = document.querySelector('.main-detail');
    //get actors
    const actors = document.querySelector('.actors');
     //create an h2  
     const header = document.createElement('h2');
     header.className = 'filmTrailer';
     header.innerHTML = `Trailer`;
     main.insertBefore(header,actors.nextSibling);
    //loop through cast
    trailers.forEach(trailer => {
        
        console.log(trailer);
       
        //make gridActors div
        const gridTrailer = document.createElement('div');
        gridTrailer.className = 'trailer-grid';
        
        //fill in actors div 
        gridTrailer.innerHTML = `
            <div class='trailer-card'>
                <iframe  width="420" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder='0' allowfullscreen></iframe>
                 <button class='playBtn'></button>
            </div>       
    `;
        trailersDiv.appendChild(gridTrailer);  
        main.appendChild(trailersDiv);
    });       
}
