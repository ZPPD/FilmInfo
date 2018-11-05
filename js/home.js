//display table
const table = function(){
    const homeTable = document.querySelector('.home-table');
    const table = document.createElement('section');
    table.className = 'table';
    table.innerHTML = `
    <div class='grid-table-top'>
        <h2>Movies</h2>
        <h2>TV</h2>
    </div>
    <div class='grid-table-bottom'>
        <div class='table-flex'>
            <button name='getHome' type='button' class='btns active' data-get='now_playing' data-type='movie'>Now Playing</button>
            <button name='getHome' type='button' class='btns' data-get='popular' data-type='movie'>Popular</button>
            <button name='getHome' type='button' class='btns' data-get='upcoming' data-type='movie'>Upcoming</button>
            <button name='getHome' type='button' class='btns' data-get='latest' data-type='movie'>Latest</button>
            <button name='getHome' type='button'class='btns' data-get='top_rated'data-type='movie'>Top Rated</button>
        </div>
        <div class='table-flex'>
            <button name='getHome' type='button' class='btns' data-get='airing_today' data-type='tv'>Airing Today</button>
            <button name='getHome' type='button' class='btns' data-get='popular' data-type='tv'>Popular</button>
            <button name='getHome' type='button' class='btns' data-get='on_air'data-type='tv'>On The Air</button>
            <button name='getHome' type='button' class='btns' data-get='latest' data-type='tv'>Latest</button>
            <button name='getHome' type='button' class='btns' data-get='top_rated'data-type='tv'>Top Rated</button>
        </div>
    </div>
    `; 
    homeTable.appendChild(table);
    //toggle class active
    const btns = document.querySelectorAll('button');

    btns.forEach(btn => btn.addEventListener('click', function(e){
        btns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
  }));
}



// //display movies grid
// const displayHome = function(){
//     // API
//     const apiKey = 'b952b137c8f2368ab0069e05f47729a0';

//     fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
//     .then(res => res.json())
//     .then(data => showHomePage(data.results))
//     .catch(err => console.log(err));
// }

// function showHomePage(movies){
//      //make playing div
//      const playing = document.createElement('div');
//      playing.className = 'playing'; 
//      //get home page
//      const homePage = document.querySelector('.home-page');
//      //get mian
//      const main = document.querySelector('.main');
//       //create an h2  
//       const header = document.createElement('h2');
//       header.className = 'nowPlaying';
//       header.innerHTML = `Now Playing`;
//       homePage.appendChild(header);

//      //loop through movies
//      movies.forEach(movie => {
         
//          console.log(movie);
        
//          //make gridMovie div
//          const gridMovie = document.createElement('div');
//          gridMovie.className = 'playing-grid';
//          const type = 'movie';
//          //fill in actors div 
//          gridMovie.innerHTML = `
//              <div class='playing-card' onClick='movieSelected("${movie.id}", "${type}")'>
//                  <img class='playing-img' src='https://image.tmdb.org/t/p/original${movie.poster_path}' alt="Now Playing movies">
//                  <h3 class='playingMovie-name'>${movie.title}</h3> 
//              </div>       
//      `;
//          playing.appendChild(gridMovie);  
//          homePage.appendChild(playing);
//      });       
// }
//fetch info from buttons
const fetchInfo = function(){
    const btns = document.querySelectorAll('.btns');
    btns.forEach(btn => btn.addEventListener('click',fetchBtnData));
    function fetchBtnData (e){
        const type = e.target.dataset.type;
        console.log(type);
        const getData = e.target.dataset.get;
        console.log(getData);
        
        // API
        const apiKey = 'b952b137c8f2368ab0069e05f47729a0';

            fetch(`https://api.themoviedb.org/3/${type}/${getData}?api_key=${apiKey}&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => showDataHome(data.results))
            .catch(err => console.log(err));
            
    //show data from request on buttons
    function showDataHome(movies){
        //make playing div
        const playing = document.createElement('div');
        playing.className = 'playing'; 
        
        
        //get home page
        const homeResults = document.querySelector('.home-results'); 
        homeResults.innerHTML = '';
        //loop through movies
        movies.forEach(movie => {
            console.log(movie);
            // const types = this.dataset.type;
            console.log(type);
            //make gridMovie div
            const gridMovie = document.createElement('div');
            gridMovie.className = 'playing-grid';
            
            //fill in gridMovie div 
            if(type === 'movie' || e.target.classList.contains('active')){
                gridMovie.innerHTML = `
                <div class='playing-card' onClick='movieSelected("${movie.id}", "${type}")'>
                    <img class='playing-img' src='https://image.tmdb.org/t/p/original${movie.poster_path}' alt="Now Playing movies">
                    <h3 class='playingMovie-name'>${movie.title}</h3> 
                </div>       
        `;}else if(type === 'tv' || e.target.classList.contains('active')){
            gridMovie.innerHTML = `
            <div class='playing-card' onClick='movieSelected("${movie.id}", "${type}")'>
                <img class='playing-img' src='https://image.tmdb.org/t/p/original${movie.poster_path}' alt="Now Playing movies">
                <h3 class='playingMovie-name'>${movie.name}</h3> 
            </div>       
        `;
            }
            
            playing.appendChild(gridMovie);  
            homeResults.appendChild(playing);
        });       
   }
}     
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
  new table();
//   new displayHome();
  new fetchInfo();
}