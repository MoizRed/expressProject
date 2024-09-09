const mongoose = require("mongoose");


const Tourschema = new mongoose.Schema({
 
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"]
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"]
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
    enum: {
      values: ["easy", "medium", "difficult"],
      message: "Difficulty is either easy, medium or difficult"
    }
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"]
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"]
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a summary"]
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"]
  },
  images: {
    type: [String]
  },
  startDates: {
    type: [String]
  }

});

const Tour = mongoose.model("tours", Tourschema);

module.exports = Tour;

