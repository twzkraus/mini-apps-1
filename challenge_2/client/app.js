const $body = $('body');
const $submit = $('#submit');
const $textInput = $('#textInput');
const $fileInput = $('#fileInput');
const $displaybox = $('#display-box');

// set up event listeners

$fileInput.on('change', (event) => {
  let file = fileInput.files[0];
  if (file) {
    let fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (fileLoadedEvent) => {
      let textFromFile = fileLoadedEvent.target.result;
      $textInput.html(textFromFile);
    };
  }
});

// jquery event listeners

$submit.click((e) => {
  e.preventDefault();
  $.ajax({
    url: '/add_data',
    method: 'POST',
    data: {
      textfield: $textInput[0].value,
      ajax: true,
    },
    success: (data) => {
      $displaybox.html(data);
    }
  });
});
