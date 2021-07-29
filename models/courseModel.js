const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: String,
  weeks: Number,
  tuition: Number,
  minimumSkill: String,
  scholarhipsAvailable: Boolean,
  bootcamp: String,
  user: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
