const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: String,
  text: String,
  rating: Number,
  bootcamp: String,
  user: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
