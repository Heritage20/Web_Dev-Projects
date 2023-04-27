const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/playground");

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find({});

  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);

  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);

  author.deleteOne();
  course.save();
}



// removeAuthor("640962b8095a9b5e64393029", "640963ba093c0ddf8e14e332");

// addAuthor("640962b8095a9b5e64393029", new Author({ name: "Amy" }));



// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "John" }),
// ]);

// listCourses();

// updateAuthor("64095f76acc5677c49f9916f");
