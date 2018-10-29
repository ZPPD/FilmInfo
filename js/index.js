// API
 const apiKey = 'b952b137c8f2368ab0069e05f47729a0';

// DOM selectors
const searchInput = document.querySelector('.search-input').value;
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
    searchFunction(searchInput);
    // MDBConfig();
    
});

// search Function
function searchFunction(){
    console.log(searchInput);
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1&include_adult=false`)
    .then(res => res.json())
    .then(data => showSearchResult(data.results))
    .catch(err => console.log(err));
}
//Output the results
function showSearchResult(movies){
    const searchResultsOutput = document.querySelector('.searchResults');
    searchResultsOutput.innerHTML = '';
    //create an h1
    const main = document.querySelector('main');
    const header = document.createElement('h1');
    header.className = 'searchHeader';
    header.innerHTML = `Search Results for ${searchInput}`;
    main.insertBefore(header, searchResultsOutput);

    //loop through the results
    movies.forEach(movie => {
        // console.log(movie);
        // MDBConfig();
        
        const movieDiv = document.createElement('div');
        movieDiv.className = 'moviediv';
        movieDiv.innerHTML = `
        <div class='grid-movie'>
            <div class='card-movie'>
                <a class='movie-link' href='#'>
                    <img class='searchMovie-img' src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt='${searchInput}'>
                    <h2 class='searchMovie-title'>${movie.title}</h2>
                </a>
            </div>
        </div>
        `;
        searchResultsOutput.appendChild(movieDiv);
    });


}
