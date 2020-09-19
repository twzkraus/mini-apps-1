const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.static('./client'));

app.listen(PORT, () => {
  console.log(`express is listening on port ${PORT}`);
});

app.post('/api/data', (req, res) => {
  console.log(req.body);
  debugger;
  console.log(`Request of type ${req.method} was received to url ${req.url}`)
});
