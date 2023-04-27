// jshint eversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});


app.post("/", function (req, res) {

const num1 = Number(req.body.n1)
const num2 = Number(req.body.n2)

const result = num1 + num2

  res.send("The result of the calculation is " + result);
});

app.post("/bmicalculator", function (req, res) {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  const bmi = weight / (height * height);

  res.send("Your BMI is " + bmi);
});



app.listen(3000, function (req, res) {
  console.log("Server is listening on port 3000");
});
