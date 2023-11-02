console.log('Hey it is me, the index!');
pageLoader();

// Function to load the page and set event listeners
function pageLoader(){
    console.log('Loading the page with functionality...')
    // Get the color buttons
    const colorButtons = document.getElementsByClassName('light-dark-button');
    for (let btn of colorButtons){
        btn.addEventListener('click', changeBackgroundColor)
    }

    // Get the nav links and add the changeView event listener
    const navLinks = document.getElementsByClassName('nav-link');
    for (let link of navLinks){
        link.addEventListener('click', changeView)
    }

    // Add the brew finder when the form submits
    const findBrewsForm = document.querySelector('#find-brews-form');
    findBrewsForm.addEventListener('submit', findBreweries);
}


// Create a function that will change the background color
function changeBackgroundColor(e){
    console.log('Clicked Color Button');
    console.log(e.target.value);
    if (e.target.value === 'Dark'){
        document.body.style.backgroundColor = '#C96E12'
    } else {
        document.body.style.backgroundColor = '#FFF897'
    }
}


// Create a function to make this a Single Page App (SPA) by swapping visible divs
function changeView(e){
    // Turn off the element(s) that are visible
    const toTurnOff = document.getElementsByClassName('is-visible');
    for (let element of toTurnOff){
        element.classList.replace('is-visible', 'is-invisible');
        let navLink = document.getElementsByName(element.id)[0];
        navLink.classList.remove('active');
    }
    // Turn on the element based on the link we clicked
    let idToTurnOn = e.target.name;
    const toTurnOn = document.getElementById(idToTurnOn);
    toTurnOn.classList.replace('is-invisible', 'is-visible');
    e.target.classList.add('active');
}


// Function to get brewery data
function findBreweries(e){
    e.preventDefault();
    // Get the value from the city Input
    const cityName = e.target.city.value;
    console.log(`Looking for breweries in ${cityName}...`);

    const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityName}&per_page=10&page=1`
    console.log(url);

    // Make API request with city name
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))


    // Reset the city input to empty
    e.target.city.value = '';

}