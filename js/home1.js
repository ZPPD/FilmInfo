

const displayHome = function(){
    // API
    const apiKey = 'b952b137c8f2368ab0069e05f47729a0';

    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => showHomePage(data.results))
    .catch(err => console.log(err));
}

function showHomePage(trending){
    const homePage = document.querySelector(".home-page");

    homePage.innerHTML = `
    <div id='myCarousel' class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active" >
            <div class='carousel-img' style="background-image: url('https://image.tmdb.org/t/p/original/${trending[0].poster_path}')">
            </div>
            <div class="carousel-caption d-none d-md-block text-left">
                <h5>Now Trending</h5>
                <h4>${trending[0].title}</h4>
            </div>
            </div>
            <div class="carousel-item">
            <div class='carousel-img' style="background-image: url('https://image.tmdb.org/t/p/original/${trending[1].poster_path}')">
            </div>
            <div class="carousel-caption d-none d-md-block text-left">
                <h5>Now Trending</h5>
                <h4>${trending[1].title}</h4>
            </div>
            </div>
            <div class="carousel-item">
            <div class='carousel-img' style="background-image: url('https://image.tmdb.org/t/p/original/${trending[2].poster_path}')">
            </div>
            <div class="carousel-caption d-none d-md-block text-left">
                <h5>Now Trending</h5>
                <h4>${trending[2].title}</h4>
            </div>
            </div>
        </div>
    </div>
    `;
    }

//init on dom load
document.addEventListener("DOMContentLoaded", init);

//init app
function init() { 
  //init homepage
  new displayHome();
}