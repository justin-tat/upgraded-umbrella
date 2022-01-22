const express = require('express');
const { getStarReviews, getProductOverview, getStyles, getCart, postCart } = require('./OverviewService');
const { getAllReviews, getAllReviewsMeta, addReview, markHelpful, reportReview } = require('./ReviewsService.js');
const { createProductObj, addRatingsData, addRelatedData, addImageData } = require('./ComparisonService');

const app = express();
const port = 3000;

app.use(express.static('./client/dist'));

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

app.get('/reviews/meta', (req, res) => {
  let productId = req.query.productId;
  getAllReviewsMeta(productId).then(result => {
    let reviewsMeta = result.data;
    res.send(reviewsMeta);
  }).catch(err => {
    res.status(404).send(err);
  })
})

app.post('/reviews', express.urlencoded({ extended: true }), express.json(), (req, res) => {
  let productId = Number (req.body.productId);
  let rating = Number (req.body.rating);
  let summary = req.body.summary;
  let body = req.body.body;
  let recommend = Boolean (req.body.recommend);
  let name = req.body.name;
  let email = req.body.email;

  addReview(productId, rating, summary, body, recommend, name, email)
    .then(result => {
      res.status(201).send('Successfully added review');
    }).catch(err => {
      console.log('Failed to add review', err);
      res.status(404).send(err);
    })
})

app.put('/reviews/:review_id/helpful', express.urlencoded({ extended: true }), express.json(), (req, res) => {
  let reviewId = Number(req.params.review_id);
  markHelpful(reviewId)
    .then(result => {
      console.log(`Successfully marked review ${reviewId} as helpful`);
      res.status(200);
    }).catch(err => {
      console.log(`Failed to mark review ${reviewId} as helpful`, err);
      res.status(400);
    });
})

app.put('/reviews/:review_id/report', (req, res) => {
  let reviewId = Number(req.params.review_id);
  reportReview(reviewId)
    .then(result => {
      console.log(`Successfully reported review ${reviewId}`);
      res.status(200);
    }).catch(err => {
      console.log(`Failed to report review ${reviewId}`, err);
      res.status(400);
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

app.get('/cart', (req, res) => {
  var productId = req.query.productID;
  //console.log("ProductID form index.js", productId);
  getCart().then(data => {
    res.send(data.data);
  })
  .catch(err => {
    console.log('Failed inside of getCart of index.js', err);
  })
});

app.post('/postToCart', (req, res) => {
  var skuID = req.query.skuID;
  var numItems = req.query.numItems;
  postCart(skuID, numItems)
  .then(() => {
    res.status(200).send();
  })
  .catch(err => {
    console.log('Failed inside of postToCart of index.js', err);
  })

})

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