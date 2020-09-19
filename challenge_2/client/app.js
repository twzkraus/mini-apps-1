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

const form = document.createElement('form');
let textinput = document.createElement('textarea');
let button = document.createElement('input');
button.setAttribute('type', 'submit');

form.appendChild(textinput);
form.appendChild(button);

form.setAttribute('action', '/api/data');
form.setAttribute('method', 'POST');

body.appendChild(form);



// set up click handlers and form submission



