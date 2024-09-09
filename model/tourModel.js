const mongoose = require("mongoose");


const Tourschema = new mongoose.Schema({
 
  id: Number,
  name: String,
  duration: Number,
  maxGroupSize: Number,
  difficulty: String,
  ratingsAverage: Number,
  ratingsQuantity: Number,
  price: Number,
  summary: String,
  description: String,
  imageCover: String,
  images: [String],
  startDates: [String]
  
});

const Tour = mongoose.model("tours", Tourschema);

module.exports = Tour;

