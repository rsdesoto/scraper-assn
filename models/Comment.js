var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  // `title` is of type String
  name: String,
  // `body` is of type String
  comment: String,
  // many comments can be included on one article. include the
  // aricle ID to link comments to ID
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;
