// set up dom elements-
  // h1
  // form
    // textarea
    // button
  // display area?
const body = document.body;
const pageTitle = document.createElement('h1');
pageTitle.innerHTML = 'JSON-CSV Converter';
body.appendChild(pageTitle);

const navBar = document.createElement('nav');
const homeButton = document.createElement('a');
homeButton.innerHTML = 'Home';
homeButton.setAttribute('href', '/');
navBar.appendChild(homeButton);
body.appendChild(navBar);

const form = document.createElement('form');

form.setAttribute('method', 'post');
form.setAttribute('action', '/add_data');

let textInput = document.createElement('textarea');
textInput.setAttribute('name', 'textfield');
textInput.setAttribute('value', 'default text');

let button = document.createElement('input');
button.setAttribute('type', 'submit');
button.setAttribute('value', 'Submit');

form.appendChild(textInput);
form.appendChild(button);

body.appendChild(form);



// set up click handlers and form submission



