const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
var postsRoutes = require('./routes/posts');
var app = new express();
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb://localhost:27017/meandb", {useNewUrlParser: true}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
    next();
})
 app.use(postsRoutes);

app.listen(3000);