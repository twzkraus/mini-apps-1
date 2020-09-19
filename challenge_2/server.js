const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.static('./client'));

app.listen(PORT, () => {
  console.log(`express is listening on port ${PORT}`);
});

app.get('/api/data', (req, res) => {
  console.log(`Request of type ${req.method} was received!`)
});
