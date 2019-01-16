var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/html/index.html"));
  });
  app.get("/article/*", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/html/article.html"));
  });
};
