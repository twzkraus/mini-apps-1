const express = require('express');
const PORT = 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`express is listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  console.log(`serving request type ${req.method} on port ${PORT}`);
});
