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
  console.log(req.body);
  debugger;
  console.log(`Request of type ${req.method} was received to url ${req.url}`);
  res.send(200);
});
