var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app) {
  // A GET route for scraping the nyt technology website
  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios
      .get("https://www.nytimes.com/section/technology/")
      .then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function(i, element) {
          // Save an empty result object
          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
            .children("a")
            .text();
          result.link =
            "https://www.nytimes.com" +
            $(this)
              .children("a")
              .attr("href");
          result.summary = $(this)
            .children("p")
            .attr("text");

          console.log(result);
          // Create a new Article using the `result` object built from scraping
          db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
        });

        // Send a message to the client
        res.send("Scrape Complete");
      });
  });

  // Route for getting all Articles from the db
  app.get("/allarticles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })

      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for saving/updating an Article's associated Comments
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    console.log(req.body);

    db.Comment.create(req.body)
      .then(function(newComment) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(newComment);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for getting all an associated Comments
  app.get("/articles/comments/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Comment.find({ article: req.params.id })

      .then(function(dbComment) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbComment);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
};
