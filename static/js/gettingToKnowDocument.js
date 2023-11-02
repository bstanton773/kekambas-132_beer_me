console.log("Let's get to know the Document!");

console.log(document);
console.log(typeof document);

let body = document.body;
console.log(body);
// console.dir(body);

// Add CSS Inline style via the .style property
body.style.backgroundColor = 'crimson';


let children = body.children
console.log(children);

let header = children[0];
console.log(header);
console.log(header.children);

let navbar = header.children[0];
console.log(navbar);
// Change/Set the class of an element using its .className property
navbar.className = 'navbar bg-primary navbar-expand-lg';



// Popular methods with the document object

// Document GET methods

// document.getElementById('id')
// return the first element with an id that matches string 'id'
let homeElement = document.getElementById('home');
console.log(homeElement);


// document.getElementsByTagName('tagName')
// return HTMLCollection (Array-like) of all elements that match 'tagName'
let allImages = document.getElementsByTagName('img');
console.log(allImages);


// document.getElementsByClassName('className')
// reutrn an HTMLCollection (Array-like) of all elements that match 'className' 
let invisibleDivs = document.getElementsByClassName('is-invisible');
console.log(invisibleDivs);


// document.querySelector('selector')
// return the FIRST element that matches the specified 'selector'
let firstNavItem = document.querySelector('.nav-item') // simple selector - class selector
console.log(firstNavItem);

let middleBubble = document.querySelector('#outerBubble div') // Combinator Selector - descendant
console.log(middleBubble);


// document.querySelectorAll('selector')
// return a NodeList (Array-like) of elements that match the specified 'selector'
let navItems = document.querySelectorAll('.nav-item');
console.log(navItems);


// Create elements with the document

// document.createElement('tagName')
// Creaete a new element with the given tag name
let newHeader = document.createElement('h3');
newHeader.innerHTML = 'Header Created by Brian with the help of JavaScript';
newHeader.className = 'text-center text-danger';
console.log(newHeader);

// Add the element to the HTML document

let heroText = document.getElementsByClassName('hero-text')[0];
// console.log(heroText);

// Element.append(elementToAdd)
// Append the elementToAdd as the LAST CHILD of Element
// heroText.append(newHeader);


// Element.prepend(elementToAdd)
// Prepend the elementToAdd as the FIRST CHILD of Element
// heroText.prepend(newHeader);


// Element.after(elementToAdd)
// Add the elementToAdd AFTER (as a sibling) the Element
// heroText.after(newHeader);

// Element.before(elementToAdd)
// Add the elementToAdd BEFORE (as a sibling) the Element
// heroText.before(newHeader);
