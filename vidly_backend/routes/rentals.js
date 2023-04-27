const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find({}).sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(404).send("Movie not in stock.");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  async function addRental() {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const result = await rental.save({ session });
      await movie.updateOne({ $inc: { numberInStock: -1 } }, { session });
      await session.commitTransaction();

      console.log("Success");
      res.send(result);
    } catch (error) {
      await session.abortTransaction();
      console.log("error111", error.message);
    }
    session.endSession();
  }
  addRental();
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = router;

// HANDLING TRANSACTIONS WITH MONGOOSE SESSION AND TRANSACTION

// async function addRental() {
//   try {
//     const session = await mongoose.startSession();
//     await session.withTransaction(async () => {
//       const result = await rental.save();
//       movie.numberInStock--;
//       await movie.save();

//       res.send(result);
//     });
//     session.endSession();
//     console.log("success");
//   } catch (error) {
//     console.log("error111", error.message);
//   }
// }
// addRental();

// async function addRental() {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const result = await rental.save({ session });
//     await movie.updateOne({ $inc: { numberInStock: -1 } }, { session });
//     await session.commitTransaction();

//     console.log("Success");
//     res.send(result);
//   } catch (error) {
//     await session.abortTransaction();
//     console.log("error111", error.message);
//   }
//     session.endSession();
// }
// addRental();
