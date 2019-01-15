var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Require all models
// var db = require("./models");

var PORT = 3000;

// Configure middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect to the Mongo DB
// mongoose.connect(
//   "mongodb://localhost/scraper",
//   { useNewUrlParser: true }
// );

// Routes
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
