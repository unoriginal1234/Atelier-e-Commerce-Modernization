//server page
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

var PORT = process.env.PORT;
// var PORT = 3001;

app.listen(PORT, ()=>{
  console.log(`Listening at localhost port ${PORT}`);
});