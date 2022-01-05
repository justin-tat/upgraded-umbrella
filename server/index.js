const express = require('express');
const { getAllReviews } = require('./ReviewsService.js');

const app = express();
const port = 3000;

app.use(express.static('./client/dist'));

// app.get('/*', (req, res) => {
//   console.log('req.method', req.method);
//   console.log('req.url', req.url);
//   res.sendStatus(200);
// })

app.get('/', (req, res) => {
  console.log('testing');
  res.sendStatus(200);
});

// Ratings & Reviews
app.get('/reviews', (req, res) => {
  getAllReviews(59553).then(result => {
    let reviews = result.data.results;
    res.send(reviews);
  }).catch(err => {
    res.status(404).send(err);
  });
})

app.get('/averageRating', (req, res) => {
  getAllReviews(59553).then(result => {
    let reviews = result.data.results;
    let rating = 0;
    for (let review of reviews) {
      rating += review.rating;
    }
    averageRating = rating / reviews.length;
    res.send({ averageRating: averageRating });
  }).catch(err => {
    res.status(404).send(err);
  });
})

app.listen(port, () => {
  console.log(`Upgraded Umbrella app listening at http://localhost:${port}`);
});