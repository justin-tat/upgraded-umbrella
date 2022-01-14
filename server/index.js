const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./client/dist'));

app.get('/*', (req, res) => {
  console.log('req.method', req.method);
  console.log('req.url', req.url);
  res.sendStatus(200);
})

app.get('/', (req, res) => {
  console.log('testing');
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});