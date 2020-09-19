// set up dom elements-
  // h1
  // form
    // textarea
    // submitButton
  // display area?
const sampleJSON = {
  "firstName": "Joshie",
  "lastName": "Wyattson",
  "county": "San Mateo",
  "city": "San Mateo",
  "role": "Broker",
  "sales": 1000000,
  "children": [
  {
    "firstName": "Beth Jr.",
    "lastName": "Johnson",
    "county": "San Mateo",
    "city": "Pacifica",
    "role": "Manager",
    "sales": 2900000,
    "children": [
      {
        "firstName": "Smitty",
        "lastName": "Won",
        "county": "San Mateo",
        "city": "Redwood City",
        "role": "Sales Person",
        "sales": 4800000,
        "children": []
      },
      {
        "firstName": "Allen",
        "lastName": "Price",
        "county": "San Mateo",
        "city": "Burlingame",
        "role": "Sales Person",
        "sales": 2500000,
        "children": []
      }
    ]
  },
  {
    "firstName": "Beth",
    "lastName": "Johnson",
    "county": "San Francisco",
    "city": "San Francisco",
    "role": "Broker/Sales Person",
    "sales": 7500000,
    "children": []
  }
]
};

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
// textInput.setAttribute('value', JSON.stringify(sampleJSON));
textInput.innerHTML = JSON.stringify(sampleJSON);

let submitButton = document.createElement('input');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('value', 'Submit');

form.appendChild(textInput);
form.appendChild(submitButton);

body.appendChild(form);



// set up event listeners

// submitButton.addEventListener('click', (event) => {
//   // so user is not redirected
//   event.preventDefault();
// });

// form.addEventListener('success', (err, data) => {
//   console.log('inside success listener');
//   displayBox.innerHTML = data;
// });

