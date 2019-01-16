// Grab the articles as a json
$.getJSON("/allarticles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<p class='article-info' data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});

$("#rescraper").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(data) {
    console.log(data);
    location.reload();
  });
});

// whenever someone clicks a p tag -- link to the article page.
// load the article into the article section.
// load the notes.

$(document).on("click", ".article-info", function() {
  var thisID = $(this).attr("data-id");
  //   alert(thisID);
  location.replace("/article/" + thisID);

  //   $("#article-detail").empty();
  //   //   $(".note-details").empty;
  //   $.ajax({
  //     method: "GET",
  //     url: "/articles/" + thisID
  //   }).then(function(data) {
  //     console.log(data);
  //     // $("#test").load("article.html");
  //     $("#articleInfo").append("<p>Hi</p>");
  //   });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
