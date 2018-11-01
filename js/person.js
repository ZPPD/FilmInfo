// API
const apiKey = 'b952b137c8f2368ab0069e05f47729a0';

//get Person function
function getPerson(){
    const personId = sessionStorage.getItem('personId');
    console.log(personId);

    //getting general info
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
    <main class='main-detail'>
        <section >
        <h2 class='biography-person'>${person.biography}</h2>
        </section>
    </main>
    `;
    personDetails.appendChild(personDiv);
}
