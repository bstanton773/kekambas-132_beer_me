console.log('Hey it is me, the index!');
pageLoader();

// Function to load the page and set event listeners
function pageLoader(){
    console.log('Loading the page with functionality...')

    // Get the color buttons to change background
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
    findBrewsForm.addEventListener('submit', e => findBreweries(e, 1));

    // Add drag and drop for the beer and coaster
    let coasterDrop = document.getElementById('droppable');
    coasterDrop.addEventListener('dragover', allowDrop);
    coasterDrop.addEventListener('drop', handleDrop);
    let draggableBeer = document.getElementById('draggable');
    draggableBeer.addEventListener('dragstart', dragBeer);
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
function findBreweries(e, pageNumber){
    e.preventDefault();
    // Get the value from the city Input
    const cityName = document.getElementsByName('city')[0].value;
    console.log(`Looking for breweries in ${cityName}...`);

    const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityName}&per_page=10&page=${pageNumber}`
    console.log(url);

    // Make API request with city name
    fetch(url)
        .then(res => res.json())
        .then(data => displayBreweries(data, pageNumber))
        .catch(err => console.error(err))

}


// Callback function for findBreweries that will insert breweries into the table
function displayBreweries(data, pageNumber){
    let table = document.getElementById('brewery-table');

    // Clear out the table of any current data
    clearTable(table);

    // Create the brewery table headers
    const thead = document.createElement('thead');
    table.append(thead);
    let tr = document.createElement('tr');
    thead.append(tr);
    const tableHeadings = ['Name', 'Type', 'Street Address', 'Address 2', 'Address 3', 'City', 'State'];
    tableHeadings.forEach( heading => {
        let th = document.createElement('th');
        th.scope = 'col';
        th.innerHTML = heading;
        tr.append(th)
    })

    let tbody = document.createElement('tbody');
    table.append(tbody);
    // write a row for each brewery in data
    for (let brewery of data){
        let tr = document.createElement('tr');
        tbody.append(tr);

        newDataCell(tr, `<a href=${brewery.website_url} target="_blank">${brewery.name}</a>`);
        newDataCell(tr, brewery.brewery_type);
        newDataCell(tr, brewery.street);
        newDataCell(tr, brewery.address_2);
        newDataCell(tr, brewery.address_3);
        newDataCell(tr, brewery.city);
        newDataCell(tr, brewery.state);
    }

    // Add a next button if there is data
    if (data.length === 10){
        let nextButton = document.createElement('button');
        nextButton.classList.add('prev-next-btn', 'btn', 'btn-primary');
        nextButton.innerHTML = 'Next';
        nextButton.addEventListener('click', e => findBreweries(e, pageNumber + 1));
        table.after(nextButton);
    }

    // Add a previous button for all pages page 1
    if (pageNumber > 1){
        let prevButton = document.createElement('button');
        prevButton.classList.add('prev-next-btn', 'btn', 'btn-danger');
        prevButton.innerHTML = 'Prev';
        prevButton.addEventListener('click', e => findBreweries(e, pageNumber - 1))
        table.after(prevButton);
    }
}

// Helper Function to create a new data cell for the table
function newDataCell(tr, value){
    let td = document.createElement('td');
    td.innerHTML = value ?? '-';
    tr.append(td)
}

// Helper Function to clear the table and buttons
function clearTable(table){
    table.innerHTML = '';
    const buttonsToClear = document.querySelectorAll('.prev-next-btn');
    for (let btn of buttonsToClear){
        btn.remove()
    }
}


// Function to allow drop events by stopping the default behavior for dragging
function allowDrop(e){
    // console.log('Allowing drop on:', e.target);
    e.preventDefault();
}


// Function to get the Beer ID when the drag starts
function dragBeer(e){
    console.log('Dragging beer...');
    e.dataTransfer.setData('text', e.target.id);
}

// Function to handle the drop
function handleDrop(e){
    console.log('Dropping beer');
    const beerID = e.dataTransfer.getData('text');
    console.log(beerID);
    const beer = document.getElementById(beerID);
    e.target.append(beer);
}