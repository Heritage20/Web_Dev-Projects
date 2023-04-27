const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mongo-exercisesDB");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    required: true,
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "a course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
});

const Course = mongoose.model("Course", courseSchema);

// async function createCourse() {
//   const course = new Course({
//     name: "Jinja Template",
//     author: "John",
//     category: "Web",
//     tags: ['frontend'],
//     isPublished: true,
//     price: 15.8,
//   });

//   try {
//     const result = await course.save();
//     console.log(result);
//   } catch (ex) {
//     console.log(ex.message);
//   }
// }

// createCourse();

// async function getCourses() {
//   const courses = await Course.find({ _id: "6408ae32ca8d40d5dc8f91be" })
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1, price: 1 });
//   console.log(courses[0].price);
// }

// getCourses();

// async function getFrontendCourses() {
//   const course = await Course.find({
//     tags: { $in: ["backend", "frontend"] },
//     isPublished: true,
//   })
//     .sort("-price")
//     .select("name author price");

//   console.log(course);
// }

// getFrontendCourses();

// async function getPriceCourses() {
//   const course = await Course.find({ isPublished: true }).or([
//     { price: { $gte: 15 } },
//     { name: /.*by.*/i },
//   ]);

//   console.log(course);
// }

// getPriceCourses();

// async function getCourses() {
//   const pageNumber = 2;
//   const pageSize = 10;

//   const courses = await Course.find({ name: "Mosh", isPublished: true })
//     .skip((pageNumber - 1) * pageSize)
//     .limit(pageSize)
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });
//   console.log(courses);
// }

// getCourses();

// async function updateCourse(id) {
//   const course = await Course.findById(id).exec();
//   if (!course) return;

//   course.isPublished = true;
//   course.author = "Another Author";

//   const result = await course.save();
//   console.log(result);
// }

// updateCourse("5a6900fff467be65019a9001");

// async function updateCourse(id) {
//   const course = await Course.findByIdAndUpdate(
//     id,
//     {
//       $set: { author: "Jack", isPublished: true },
//     },
//     { new: true }
//   );
//   console.log(course);
// }

// updateCourse("5a68ff090c553064a218a547");

// async function updateCourse(id) {
//   const result = await Course.deleteOne({_id: id});
//   console.log(result);
// }

// updateCourse("5a68ff090c553064a218a547");

// async function updateCourse(id) {
//   const result = await Course.findByIdAndRemove(id);
//   console.log(result);
// }

// updateCourse("5a68ff090c553064a218a547");
