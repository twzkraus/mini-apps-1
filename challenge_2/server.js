const express = require('express');
const PORT = 3000;
const path = require('path');
let dataServed;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(express.static('./client'));

app.listen(PORT, () => {
  console.log(`express is listening on port ${PORT}`);
});

app.post('/add_data', (req, res) => {
  console.log(`Request of type ${req.method} was received to url ${req.url}`);
  dataServed = parseJSONToCSV(JSON.parse(req.body.textfield));

  // req.body.ajax is a property added if the request is sent as AJAX and not with default html stuff
  if (req.body.ajax) {
    res.send(dataServed.split('\n').join('<br>'));
  } else {
    res.format({
      html: () => {
        res.send(addCSVtoHTML(dataServed));
      },
    });
  }
});

app.get('/add_data', (req, res) => {
  res.send(dataServed.split('\n').join('<br>'));
});

const parseJSONToCSV = (obj) => {
  let headersArr = [];
  for (let key in obj) {
    if (key !== 'children') {
      headersArr.push(key);
    }
  }
  return headersArr.join(',') + '\n' + parseSingleRow(obj);
};

const parseSingleRow = (obj) => {
  let thisRowArr = [];
  let nextRow = '';
  for (let key in obj) {
    if (key !== 'children') {
      thisRowArr.push(obj[key]);
    }
  }

  obj.children.forEach(child => {
    nextRow += '\n' + parseSingleRow(child);
  });

  return thisRowArr.join(',') + nextRow;
};

const addCSVtoHTML = (csvData) => {
  return `<!DOCTYPE html>
<html>
  <head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>

  <body>
    <h1>JSON-CSV Converter</h1>
    <nav><a href="/">Home</a></nav>
    <div>
      ${csvData.split('\n').join('<br>')}
    </div>
    <form method="post" action="/add_data">
      <textarea rows="10" name="textfield"></textarea>
      <input type="submit" value="Submit"></input>
    </form>
  </body>
</html>`
};
