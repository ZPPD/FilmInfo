// API
const apiKey = 'b952b137c8f2368ab0069e05f47729a0';

//get Person function
function getPerson(){
    const personId = sessionStorage.getItem('personId');
    console.log(personId);

    //getting general info for person
    fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => showPersonDetails(data))
    .catch(err => console.log(err));     
}

function showPersonDetails(person){
    const personDetails = document.querySelector('.person-details');
    const personDiv = document.createElement('div');
    personDiv.className = 'personDiv';


    personDiv.innerHTML = `
    <header class='details-person-header'>
        <section class='back-arrow'></section>
        <section class='details-title'>
            <img class='person-img' src='https://image.tmdb.org/t/p/original${person.profile_path}' alt='${person.name}'>
            <h1>${person.name}</h1>
            <p>${person.known_for_department}</p>
            <p>Born: ${person.birthday} | ${person.place_of_birth}</p>
        </section>
    </header>
    <main class='main-detail main-person'>
        <section class='bio'>
        <h2 class='biography-person'>${person.biography}</h2>
        </section>
    </main>
    `;
    personDetails.appendChild(personDiv);
}

function getPhotos(){
    const personId = sessionStorage.getItem('personId');

    //getting movie and tv credits for person
    fetch(`https://api.themoviedb.org/3/person/${personId}/images?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => showPhotos(data.profiles))
    .catch(err => console.log(err));   
}

function showPhotos(photos){
    //make photo section
    const photoSection = document.createElement('section');
    photoSection.className = 'photoSection'; 
    //get main
    const main = document.querySelector('.main-person');
    //get biography
    const bio = document.querySelector('.bio');
     //create an h2  
     const header = document.createElement('h2');
     header.className = 'filmPhotos';
     header.innerHTML = `Photos`;
     main.insertBefore(header,bio.nextSibling);

    photos.forEach(photo => {
        //make photo div
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';

        photoCard.innerHTML = `
        <img class='photo-image' src='https://image.tmdb.org/t/p/original${photo.file_path}'>
        `;
        photoSection.appendChild(photoCard);
        main.appendChild(photoSection);
    })
}

function getCredits(){
    const personId = sessionStorage.getItem('personId');

    //getting movie and tv credits for person
    fetch(`https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => showPersonCredits(data.cast))
    .catch(err => console.log(err));   
}

function showPersonCredits(credits){
    //make credits div
    const creditsDiv = document.createElement('div');
    creditsDiv.className = 'creditsDiv'; 
    //get main
    const main = document.querySelector('.main-person');
    //get photo
    const photoSection = document.querySelector('.photoSection');
     //create an h2  
     const header = document.createElement('h2');
     header.className = 'filmCredits';
     header.innerHTML = `Filmography`;
     main.insertBefore(header,photoSection.nextSibling);

    //loop through credits
    credits.forEach(credit => {
        //make card div
        const cardCredit = document.createElement('div');
        cardCredit.className = 'card-credit';
        
        if(credit.media_type === 'movie'){
        //fill in actors div 
        cardCredit.innerHTML = `
        <div class='credit-flex' onClick='movieSelected("${credit.id}","${credit.media_type}")'>
        <div>
        <img class='credit-img' src='https://image.tmdb.org/t/p/original${credit.poster_path}' alt='Filmography'> 
        </div> 
        <div>
        <h2 class='credit-title'>${credit.original_title}</h2>
        <p>${credit.release_date}</p>
        <h3 class='credit-character'>${credit.character}</h3>  
        <p>${credit.overview}</p>
        </div>
        </div>
    `;} else if(credit.media_type === 'tv'){
        cardCredit.innerHTML = `
        <div class='credit-flex' onClick='movieSelected("${credit.id}","${credit.media_type}")'>
        <div>
        <img class='credit-img' src='https://image.tmdb.org/t/p/original${credit.poster_path}' alt='Filmography'>
        </div>
        <div>  
        <h2 class='credit-title'>${credit.name}</h2> 
        <p>${credit.first_air_date}</p>
        <h3 class='credit-character'>${credit.character}</h3>  
        <p>${credit.overview}</p>
        </div>
        </div>
        `;}
        creditsDiv.appendChild(cardCredit);  
        main.appendChild(creditsDiv);
    });       
}

// select a movie and get details
function movieSelected(id,type){
    sessionStorage.setItem('movieId', id);
    sessionStorage.setItem('movieType', type);
    window.location = 'movie.html';
    return false;
}
