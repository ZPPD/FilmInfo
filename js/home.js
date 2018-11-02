const displayHome = function(){
    // API
    const apiKey = 'b952b137c8f2368ab0069e05f47729a0';

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
    .then(res => res.json())
    .then(data => showHomePage(data.results))
    .catch(err => console.log(err));
}

function showHomePage(movies){
     //make playing div
     const playing = document.createElement('div');
     playing.className = 'playing'; 
     //get home page
     const homePage = document.querySelector('.home-page');
     //get mian
     const main = document.querySelector('.main');
      //create an h2  
      const header = document.createElement('h2');
      header.className = 'nowPlaying';
      header.innerHTML = `Now Playing`;
      homePage.appendChild(header);

     //loop through cast
     movies.forEach(movie => {
         
         console.log(movie);
        
         //make gridMovie div
         const gridMovie = document.createElement('div');
         gridMovie.className = 'playing-grid';
         const type = 'movie';
         //fill in actors div 
         gridMovie.innerHTML = `
             <div class='playing-card' onClick='movieSelected("${movie.id}", "${type}")'>
                 <img class='playing-img' src='https://image.tmdb.org/t/p/original${movie.poster_path}' alt="Now Playing movies">
                 <h3 class='playingMovie-name'>${movie.title}</h3> 
             </div>       
     `;
         playing.appendChild(gridMovie);  
         homePage.appendChild(playing);
     });       
}
// select a movie and get details
function movieSelected(id, type){
    sessionStorage.setItem('movieId', id);
    sessionStorage.setItem('movieType', type);
    console.log(type);
    window.location = 'movie.html';
    return false;
}

//init on dom load
document.addEventListener("DOMContentLoaded", init);

//init app
function init() { 
  //init homepage
  new displayHome();
}