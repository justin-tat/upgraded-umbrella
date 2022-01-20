const express = require('express');
const { getAllReviews } = require('./ReviewsService.js');
const { getStarReviews, getProductOverview, getStyles } = require('./OverviewService');
const { createProductObj, addRatingsData, addRelatedData, addImageData } = require('./ComparisonService');

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
  let productId = req.query.productId;
  getAllReviews(productId).then(result => {
    let reviews = result.data.results;
    res.send(reviews);
  }).catch(err => {
    res.status(404).send(err);
  });
})

app.get('/averageRating', (req, res) => {
  let productId = req.query.productId;
  getAllReviews(productId).then(result => {
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

//Overview API Requests
app.get('/starReviews', (req, res) => {
  var productID = req.query.productID;
  getStarReviews(productID).then(results => {
    //console.log("Inside express server", results.data);
    res.send(results.data);
  })
  .catch(err => {
    console.log("Failed in starReviews");
    res.status(404).send(err);
  })
});

app.get('/styles', (req, res) => {
  var productID = req.query.productID;
  getStyles(productID).then(results => {
    res.send(results.data);
  })
  .catch(err => {
    console.log("Failed in styles", err);
    res.status(404).send(err);
  })
});

app.get('/productOverview', (req, res) => {
  var productID = req.query.productID;
  getProductOverview(productID).then(results => {
    //console.log('Inside express server productOverview', results.data);
    res.send(results.data);
  })
  .catch(err => {
    console.log('Failing inside of express productOverview', err);
    res.status(404).send(err);
  })
});

//Comparison API Requests
app.get('/productData', (req, res) => {
  var productId = req.query.productId;
  createProductObj(productId)
  .then(results => {
    res.send(results.data);
  })
  .catch(err => {
    console.log('ERROR pulling product data: ', err);
    res.status(404).send(err);
  });
});

app.get('/addRatingsData', (req, res) => {
  var productId = req.query.productId;
  addRatingsData(productId)
  .then(results => {
    res.send(results.data.ratings);
  })
  .catch(err => {
    console.log('ERROR pulling ratings data: ', err);
    res.status(404).send(err);
  });
});

app.get('/addRelatedData', (req, res) => {
  var productId = req.query.productId;
  addRelatedData(productId)
  .then(results => {
    res.send(results.data);
  })
  .catch(err => {
    console.log('ERROR pulling related data: ', err);
    res.status(404).send(err);
  });
});

app.get('/addImageData', (req, res) => {
  var productId = req.query.productId;
  addImageData(productId)
  .then(results => {
    res.send(results.data);
  })
  .catch(err => {
    console.log('ERROR pulling image data: ', err);
    res.status(404).send(err);
  });
});




app.listen(port, () => {
  console.log(`Upgraded Umbrella app listening at http://localhost:${port}`);
});