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
     details.innerHTML = `
        <header class='details-header' style="background-image: url('https://image.tmdb.org/t/p/original${detail.backdrop_path}')">
        <section class='details-title'>
            <h1>${detail.original_title}</h1>
            <p>${detail.status} | ${detail.original_language}</p>
            <p>${detail.genres[0].name} | ${detail.genres[1].name}</p>
        </section>
        </header>
        <main class='main-detail'>
            <section class='summary-detail'>
            <h2>Summary</h2>
            <p>${detail.overview}</p>
            </section>
        </main>
    `;

    movieDetails.appendChild(details);
}

//get cast
function getCast(){
     //fetching cast and crew for movie 
    fetch(`https://api.themoviedb.org/3/${movieType}/${movieId}/credits?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => showCast(data))
    .catch(err => console.log(err));
}