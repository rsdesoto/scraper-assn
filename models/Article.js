var mongoose = require("mongoose");

// bring in the schema constructor
var Schema = mongoose.Schema;

// create a schema for each article - essentially a constructor
var ArticleSchema = new Schema({
  // title
  title: {
    type: String,
    required: true
  },
  // link
  link: {
    type: String,
    required: true
  }
  // text
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
