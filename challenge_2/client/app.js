// set up dom elements-
  // h1
  // form
    // textarea
    // submitButton
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
textInput.setAttribute('rows', '10');

let fileInput = document.createElement('input');
fileInput.setAttribute('type', 'file');
fileInput.setAttribute('name', 'fileInput');

let submitButton = document.createElement('input');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('value', 'Submit');

form.appendChild(textInput);
form.appendChild(fileInput);
form.appendChild(submitButton);

body.appendChild(form);



// set up event listeners

fileInput.addEventListener('change', (event) => {
  let file = fileInput.files[0];
  if (file) {
    let fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (fileLoadedEvent) => {
      let textFromFile = fileLoadedEvent.target.result;
      textInput.innerHTML = textFromFile;
    };
  }
});

// submitButton.addEventListener('click', (event) => {
//   // so user is not redirected
//   event.preventDefault();
// });

// form.addEventListener('success', (err, data) => {
//   console.log('inside success listener');
//   displayBox.innerHTML = data;
// });

