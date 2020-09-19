const express = require('express');
const PORT = 3000;
const bodyParser = require('body-parser');
const path = require('path');
let dataServed;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.static('./client'));

app.listen(PORT, () => {
  console.log(`express is listening on port ${PORT}`);
});

app.post('/add_data', (req, res) => {
  console.log(`Request of type ${req.method} was received to url ${req.url}`);
  dataServed = parseJSONToCSV(JSON.parse(req.body.textfield));

  res.format({
    html: () => {
      res.send(addCSVtoHTML(dataServed));
    },
  });
});

app.get('/add_data', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
})

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

</html>`
};
