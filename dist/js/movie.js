// API
const apiKey = "b952b137c8f2368ab0069e05f47729a0";

//get Movie is called when movie.html opens
function getMovie() {
  const movieId = sessionStorage.getItem("movieId");
  const movieType = sessionStorage.getItem("movieType");
  console.log(typeof movieId, typeof movieType);
  console.log(movieId, movieType);

  //getting general info
  fetch(
    `https://api.themoviedb.org/3/${movieType}/${movieId}?api_key=${apiKey}&language=en-US`
  )
    .then(res => res.json())
    .then(data => showMovieDetails(data))
    .catch(err => console.log(err));
}

function showMovieDetails(detail) {
  // const movieDetails = document.querySelector(".movie-details");
  // const details = document.createElement("div");
  // details.className = "details-movie-output";
  // get header
  const header = document.querySelector('.header');
  // get summary
  const summary = document.querySelector('.summary-detail');

  const movieType = sessionStorage.getItem("movieType");

  if (movieType === "movie") {
    header.innerHTML = `
        <div class='details-header' style="background-image: url('https://image.tmdb.org/t/p/original${
          detail.backdrop_path
        }')">
        <a class='back-arrow' href='index.html'></a>
        <section class='details-title'>
            <h1>${detail.original_title}</h1>
            <p>${detail.status} | ${detail.original_language}</p>
            <p>${detail.genres[0].name}</p>
        </section>
        </div>`;

        summary.innerHTML = `
            <section class='summary-detail'>
            <h2>Summary</h2>
            <p>${detail.overview}</p>
            </section>
    `;
  } else if (movieType === "tv") {
    header.innerHTML = `
        <div class='details-header' style="background-image: url('https://image.tmdb.org/t/p/original${
          detail.backdrop_path
        }')">
        <section class='back-arrow'></section>
        <section class='details-title'>
            <h1>${detail.name}</h1>
            <p>${detail.status} | ${detail.original_language}</p>
            <p>${detail.genres[0].name} | ${
      detail.number_of_seasons
    } Seasons</p>
        </section>
        </div>`;
        summary.innerHTML = `
            <section class='summary-detail'>
                <h2>Summary</h2>
                <p>${detail.overview}</p>
            </section>
    `;
  }

  // movieDetails.appendChild(details);
}

//get cast
function getCast() {
  let movieId = sessionStorage.getItem("movieId");
  let movieType = sessionStorage.getItem("movieType");

  if (movieType === "movie" || movieType === "tv") {
    //fetching cast and crew for movie
    fetch(
      `https://api.themoviedb.org/3/${movieType}/${movieId}/credits?api_key=${apiKey}`
    )
      .then(res => res.json())
      .then(data => showCast(data.cast))
      .catch(err => console.log(err));
  }
}
//show Movie cast
function showCast(cast) {
  // //make actors div
  // const actors = document.createElement("div");
  // actors.className = "actors";
  // get actors
  const actors = document.querySelector('.actors');
  //get main
  const main = document.querySelector(".main-detail");
  //get summary
  const summary = document.querySelector(".summary-detail");
  //create an h2
  const header = document.createElement("h2");
  header.className = "filmCast";
  header.innerHTML = `Cast`;
  main.insertBefore(header, summary.nextSibling);
  //loop through cast
  cast.forEach(person => {
    console.log(person);

    //make gridActors div
    const gridActors = document.createElement("div");
    gridActors.className = "actor-grid";

    //fill in actors div
    gridActors.innerHTML = `
            <div class='actor-card' onClick="personSelected(${person.id})">
                <img class='cast-img' src='https://image.tmdb.org/t/p/original${
                  person.profile_path
                }' alt="Film's Cast">
                <h3 class='cast-name'>${person.name} as ${
      person.character
    }</h3> 
            </div>       
    `;
    actors.appendChild(gridActors);
    // main.appendChild(actors);
  });
}

// get Trailer
function getTrailer() {
  let movieId = sessionStorage.getItem("movieId");
  let movieType = sessionStorage.getItem("movieType");

  if (movieType === "movie" || movieType === "tv") {
    //fetching cast and crew for movie
    fetch(
      `https://api.themoviedb.org/3/${movieType}/${movieId}/videos?api_key=${apiKey}`
    )
      .then(res => res.json())
      .then(data => showTrailers(data.results))
      .catch(err => console.log(err));
  }
}
//show Movie cast
function showTrailers(trailers) {
  // //make trailers div
  // const trailersDiv = document.createElement("div");
  // trailersDiv.className = "trailers";
  // get trailers
  const trailersDiv = document.querySelector('.trailers');
  //get main
  const main = document.querySelector(".main-detail");
  //get actors
  const actors = document.querySelector(".actors");
  //create an h2
  const header = document.createElement("h2");
  header.className = "filmTrailer";
  header.innerHTML = `Trailer`;
  main.insertBefore(header, actors.nextSibling);
  //loop through cast
  trailers.forEach(trailer => {
    console.log(trailer);

    //make gridActors div
    const gridTrailer = document.createElement("div");
    gridTrailer.className = "trailer-grid";

    //fill in actors div
    gridTrailer.innerHTML = `
            <div class='trailer-card'>
                <iframe  width="420" height="300" src="https://www.youtube.com/embed/${
                  trailer.key
                }" frameborder='0' allowfullscreen></iframe>
            </div>       
    `;
    trailersDiv.appendChild(gridTrailer);
    // main.appendChild(trailersDiv);
  });
}

// select a person and get details
function personSelected(id) {
  sessionStorage.setItem("personId", id);
  window.location = "person.html";
  return false;
}
