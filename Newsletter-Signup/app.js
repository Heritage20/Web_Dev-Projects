// jshint eversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/cad3aad129";

  const options = {
    method: "POST",
    auth: "abraham20:fabcc7a9dec912cf778d5e50f8ae5288-us10",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

  app.post("/failure", function (req, res) {
    res.redirect("/");
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// const url = "https://$API_SERVER.api.mailchimp.com/3.0/lists";

// api-key for mailchimp server
// fabcc7a9dec912cf778d5e50f8ae5288-us10

// cad3aad129; audience/list id
