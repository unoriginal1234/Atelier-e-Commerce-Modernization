//server page
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

var PORT = process.env.PORT || 3000;

const token = {
  headers: {
    'Authorization': process.env.REACT_APP_API_KEY,
  }
};
//product
app.get('/product:id', function (req, res) {
  console.log(req.params.id.slice(1));
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${req.params.id.slice(1)}`, token)
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => {
      res.status(401).send()
    });
})
//cart
app.get('/cart:id', function (req, res) {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/cart?session_id=${req.params.id.slice(1)}`, token)
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => {
      res.status(401).send()
    });
});
//related
app.get('/related:id', function (req, res) {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${req.params.id.slice(1)}/related`, token)
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => {
      res.status(401).send()
    });
});
//styles
app.get('/styles:id', function (req, res) {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${req.params.id.slice(1)}/styles`, token)
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => {
      res.status(401).send()
    });
});
//meta
app.get('/meta:id', function (req, res) {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${req.params.id.slice(1)}`, token)
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => {
      res.status(401).send()
    });
});
//reviews
app.get('/reviews:id', function (req, res) {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/?product_id=${req.params.id.slice(1)}&count=100`, token)
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => {
      res.status(401).send()
    });
});
//sort
app.get('/reviews:id/sort:sort', function (req, res) {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?sort=${req.params.sort.slice(1)}&product_id=${req.params.id.slice(1)}&count=100`, token)
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => {
      res.status(401).send()
    });
});

app.put('/reviews:id/helpful', function (req, res) {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/${req.params.id.slice(1)}/helpful`, null , token)
    .then(() => {
      res.status(200).send()
    })
    .catch(() => {
      res.status(401).send()
    });
});

app.put('/reviews:id/report', function(req, res) {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/${req.params.id.slice(1)}/report`, null , token)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(401).send();
    })
})



app.listen(PORT, ()=>{
  console.log(`Listening at localhost port ${PORT}`);
});