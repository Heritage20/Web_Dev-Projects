const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app
  .route("/articles")

  .get(async (req, res) => {
    const article = await Article.find({});

    try {
      res.send(article);
    } catch (err) {
      res.send(err);
    }
  })

  .post(async (req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    try {
      await newArticle.save();
    } catch (err) {
      console.log(err);
    }
  })

  .delete(async (req, res) => {
    await Article.deleteMany({});

    try {
      res.send("Successfully deleted all articles");
    } catch (err) {
      res.send(err);
    }
  });

app
  .route("/articles/:articleTitle")

  .get(async (req, res) => {
    try {
      const article = await Article.findOne({ title: req.params.articleTitle });
      res.send(article);
    } catch (err) {
      console.log("No articles matching that title was found");
    }
  })

  .put(async (req, res) => {
    try {
      await Article.updateOne(
        { title: req.params.articleTitle },
        { title: req.body.title, content: req.body.content }
      );
      res.send("Successfully updated the selected article.");
    } catch (e) {
      res.send("Article not found");
    }
  })

  .patch(async (req, res) => {
    try {
      await Article.updateOne(
        { title: req.params.articleTitle },
        { $set: req.body }
      );
      res.send("Successfully updated the selected article.");
    } catch (e) {
      res.send("err");
    }
  })

  .delete(async (req, res) => {
    try {
      await Article.deleteOne({ title: req.body.title });
      res.send("Successfully deleted the corresponding articles");
    } catch (e) {
      res.send("err");
    }
  });

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server is listening on port " + port);
});
