$(document).ready(function() {
  console.log("ready!");
  var pathname = window.location.pathname;
  console.log(pathname);
  var apiname = pathname.substring(9);
  console.log(apiname);

  $("#noteDetails").empty();
  $("#articleInfo").empty();

  $.ajax({
    method: "GET",
    url: "/articles/" + apiname
  }).then(function(data) {
    console.log(data);
    // $("#test").load("article.html");
    $("#articleInfo").append(`<h2>${data.title}</h2>`);
    $("#articleInfo").append(`<a href="${data.link}">Link to article</a>`);
  });

  $.getJSON("/articles/comments/" + apiname, function(data) {
    console.log(data);
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#noteDetails").append(
        `<h2>${data[i].name}</h2>` + `<p>${data[i].comment}</p>`
      );
    }
  });
});

$("#input-submit").on("click", function(event) {
  event.preventDefault();
  alert("hi");
  var name = $("#input-name")
    .val()
    .trim();

  var comment = $("#input-text")
    .val()
    .trim();

  if (name === "" || comment === "") {
    alert("Please enter a name and a comment");
    return;
  }
  alert(name);
  alert(comment);
  var pathname = window.location.pathname;
  var apiname = pathname.substring(9);
  console.log(apiname);

  $.ajax({
    method: "POST",
    url: "/articles/" + apiname,
    data: {
      name: name,
      comment: comment,
      article: apiname
    }
  }).then(function(data) {
    console.log(data);
    // $("#test").load("article.html");
    $("#noteDetails").append(`<h2>${data.name}</h2>`);
    $("#noteDetails").append(`<p>${data.comment}</p>`);
  });
});

$(".home").on("click", function(event) {
  event.preventDefault();
  location.replace("/");
});
