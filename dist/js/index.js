// API
const apiKey = "b952b137c8f2368ab0069e05f47729a0";

//page
let page = 1;

// DOM selectors
const searchInput = document.querySelector(".search-input");
const form = document.querySelector("#searchForm");

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
form.addEventListener("submit", e => {
  e.preventDefault();
  // MDBConfig();

  // validation
  if (!searchInput.value) {
    showAlert("Please enter a search word");
    return;
  }
  // run search function if search word exists
  searchFunction(searchInput);

  //show page buttons
  showPageButtons();
});

// search Function
function searchFunction() {
  //console.log(searchInput.value);
  fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${
      searchInput.value
    }&page=${page}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => showSearchResult(data.results))
    .catch(err => console.log(err));
}
//Output the results
function showSearchResult(movies) {
  //hide home page
  const homePage = document.querySelector(".home-page");
  homePage.style.display = "none";

  //get searchResultsOutput
  const searchResultsOutput = document.querySelector(".searchResults");
  searchResultsOutput.innerHTML = "";
  //create movie div for the grid
  const movieDiv = document.createElement("div");
  movieDiv.className = "moviediv";

  //create an h1
  const header = document.createElement("h1");
  header.className = "searchHeader";
  header.innerHTML = `Search Results for ${searchInput.value}`;
  searchResultsOutput.appendChild(header);
  // create hr
  const hr = document.createElement("hr");
  hr.className = "search-divider";
  searchResultsOutput.insertBefore(hr, header.nextSibling);

  //loop through the results
  movies.forEach(movie => {
    // console.log(movie);
    // MDBConfig();

    //create grid div
    const grid = document.createElement("div");
    grid.className = "grid-movie";
    //validate the type and fill in the grid div
    if (movie.media_type === "movie") {
      grid.innerHTML = `
            <div class='card-movie'>
                <a onClick='movieSelected("${movie.id}","${
        movie.media_type
      }")' class='movie-link' href='#'>
                    <img class='searchMovie-img' src="https://image.tmdb.org/t/p/original/${
                      movie.poster_path
                    }" alt='${searchInput.value}'>
                    <h2 class='searchMovie-title'>${movie.title}</h2>
                    <h3 class='media-type'>${movie.media_type}</h3>
                </a>
            </div>
        `;
    } else if (movie.media_type === "tv") {
      grid.innerHTML = `
            <div class='card-movie'>
                <a onClick='movieSelected("${movie.id}","${
        movie.media_type
      }")' class='movie-link' href='#'>
                    <img class='searchMovie-img' src="https://image.tmdb.org/t/p/original/${
                      movie.poster_path
                    }" alt='${searchInput.value}'>
                    <h2 class='searchMovie-title'>${movie.name}</h2>
                    <h3 class='media-type'>${movie.media_type}</h3>
                </a>
            </div>
        `;
    }

    //append grid to movieDiv, and movieDiv to searchResultsOutput
    movieDiv.appendChild(grid);
    searchResultsOutput.appendChild(movieDiv);
  });
}
function showPageButtons() {
  //get main
  const main = document.querySelector(".main");
  //get searchResultsOutput
  const searchResultsOutput = document.querySelector(".searchResults");

  //pagination
  const pagination = document.createElement("div");
  pagination.className = "pagination";
  pagination.innerHTML = `
    <button class='prev-page page' data-state='-'><i class="fas fa-arrow-circle-left"></i> 
    Previous</button>
    <button class='next-page page' data-state='+'>Next <i class="fas fa-arrow-circle-right"></i></button>
    `;
  main.insertBefore(pagination, searchResultsOutput.nextSibling);

  const event = document.querySelectorAll(".page");
  event.forEach(button => button.addEventListener("click", change));
  //handle Pagination
  function change(e) {
    if (page === 1 && e.target.dataset.state === "-") {
      page = 1;
      console.log(page);
    } else if (e.target.dataset.state === "+") {
      page++;
      console.log(page);
    } else if (e.target.dataset.state === "-") {
      page--;
      console.log(page);
    }
    searchFunction(searchInput);
  }
}

// alert message
function showAlert(message) {
  //create div
  const div = document.createElement("div");
  //add classes
  div.className = "alert";
  //add text
  div.appendChild(document.createTextNode(message));
  //get main
  const main = document.querySelector(".main");
  //get header
  // const searchHeader = document.querySelector('.searchHeader');
  const searchResultsOutput = document.querySelector(".searchResults");
  //insert before header in main
  main.insertBefore(div, searchResultsOutput);

  //time out
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// select a movie and get details
function movieSelected(id, type) {
  sessionStorage.setItem("movieId", id);
  sessionStorage.setItem("movieType", type);
  window.location = "movie.html";
  return false;
}
