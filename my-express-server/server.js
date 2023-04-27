// jshint eversion:6

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

app.get("/contact", function (req, res) {
  res.send("Contact me at: abrahamfatoki@gmail.com");
});

app.get("/about", function (req, res) {
  res.send("My name is Abraham and I love church and code.");
});

app.get("/hobbies", function (req, res) {
  res.send("<ul><li>Coffee</li><li>Code</li><li>Coke</li></ul>");
});

app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
