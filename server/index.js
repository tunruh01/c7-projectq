const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes/main')

mongoose.connect('mongodb://localhost/projectq', {useNewUrlParser: true})

const app = express();

// CORS
app.use(function( req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(mainRoutes)

app.listen(5000, () => {
  console.log('Node.js listening on port ' + 5000)
})

