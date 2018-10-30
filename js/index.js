// API
 const apiKey = 'b952b137c8f2368ab0069e05f47729a0';

// DOM selectors
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('#searchForm');

// //config
// let config = '';

// //config to fetch the images
// function MDBConfig(){
//     fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
//     .then(res => res.json())
//     .then(data => getImage(data.images))
//     .catch(err => console.log(err));
// }
// //check for images
//     function getImage(image){
//         // return image ? image.secure_base_url + image.poster_sizes[6] : '';
//         console.log(image);
//         if(image){
//             config = `${image.secure_base_url}${image.poster_sizes[6]}`;
//             console.log(config);
//             return config;
//         } else {
//             config = '';
//         }
//         return config;
//     }
//     console.log(config);
// event Listener
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    // MDBConfig();

    // validation
    if(!searchInput.value){
        showAlert('Please enter a search word');
        return;
    }
    // run search function if search word exists
    searchFunction(searchInput);
});

// search Function
function searchFunction(){
    console.log(searchInput.value);
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchInput.value}&page=1&include_adult=false`)
    .then(res => res.json())
    .then(data => showSearchResult(data.results))
    .catch(err => console.log(err));
}
//Output the results
function showSearchResult(movies){
    const searchResultsOutput = document.querySelector('.searchResults');
    searchResultsOutput.innerHTML = '';
    //create movie div for the grid
    const movieDiv = document.createElement('div');
    movieDiv.className = 'moviediv';

    //create an h1  
    const header = document.createElement('h1');
    header.className = 'searchHeader';
    header.innerHTML = `Search Results for ${searchInput.value}`;
    searchResultsOutput.appendChild(header);
    // create hr
    const hr = document.createElement('hr');
    hr.className = 'search-divider';
    searchResultsOutput.insertBefore(hr,header.nextSibling);
    //clear the input field
    searchInput.value = '';

    //loop through the results
    movies.forEach(movie => {
        // console.log(movie);
        // MDBConfig();
        
        const grid = document.createElement('div');
        grid.className = 'grid-movie';
        if(movie.media_type === 'movie'){
        grid.innerHTML = `
            <div class='card-movie'>
                <a class='movie-link' href='#'>
                    <img class='searchMovie-img' src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt='${searchInput.value}'>
                    <h2 class='searchMovie-title'>${movie.title}</h2>
                    <h3 class='media-type'>${movie.media_type}</h3>
                </a>
            </div>
        `;} else if(movie.media_type === "tv"){
            grid.innerHTML = `
            <div class='card-movie'>
                <a class='movie-link' href='#'>
                    <img class='searchMovie-img' src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt='${searchInput.value}'>
                    <h2 class='searchMovie-title'>${movie.name}</h2>
                    <h3 class='media-type'>${movie.media_type}</h3>
                </a>
            </div>
        `;
        }
        movieDiv.appendChild(grid);
        searchResultsOutput.appendChild(movieDiv);
    });

}

// alert message
function showAlert(message) {
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = 'alert';
    //add text
    div.appendChild(document.createTextNode(message));
    //get main
    const main = document.querySelector('.main');
    //get header
    // const searchHeader = document.querySelector('.searchHeader');
    const searchResultsOutput = document.querySelector('.searchResults');
    //insert before header in main
    main.insertBefore(div, searchResultsOutput);
  
    //time out
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

//   To-Do
// style the alert
// remove h1 on submit
