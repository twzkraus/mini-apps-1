const express = require('express');
const PORT = 3000;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.static('./client'));

app.listen(PORT, () => {
  console.log(`express is listening on port ${PORT}`);
});

app.post('/add_data', (req, res) => {
  console.log(`Request of type ${req.method} was received to url ${req.url}`);
  res.send(parseJSONToCSV(JSON.parse(req.body.textfield)));
});

parseJSONToCSV = (obj) => {
  let headersArr = [];
  for (let key in obj) {
    if (key !== 'children') {
      headersArr.push(key);
    }
  }
  debugger;
  return headersArr.join(',') + '\n' + parseSingleRow(obj);
};

parseSingleRow = (obj) => {
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
}
