const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Bootcamp = require("./../models/bootcampModel");
const Course = require("./../models/courseModel");
const Review = require("./../models/reviewModel");
const User = require("./../models/userModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LINK.replace(
  "<PASSWORD>",
  process.env.PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("DB successfuly connected..."));

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/courses.json`, "utf-8")
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

importBootcamps = async (req, res) => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Bootcamps successfuly imported...");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

deleteBootcamps = async (req, res) => {
  try {
    await Bootcamp.deleteMany();
    console.log("Bootcamps successfuly deleted...");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importCourses = async (req, res) => {
  try {
    await Course.create(courses);
    console.log("Courses successfuly imported...");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

deleteCourses = async (req, res) => {
  try {
    await Course.deleteMany();
    console.log("Courses successfuly deleted...");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importReviews = async (req, res) => {
  try {
    await Review.create(reviews);
    console.log("reviews successfuly imported...");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

deleteReviews = async (req, res) => {
  try {
    await Review.deleteMany();
    console.log("Reviews successfuly deleted...");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importUsers = async (req, res) => {
  try {
    await User.create(users);
    console.log("Users successfuly imported...");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

deleteUsers = async (req, res) => {
  try {
    await User.deleteMany();
    console.log("Users successfuly deleted...");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import-bootcamps") {
  importBootcamps();
} else if (process.argv[2] === "--delete-bootcamps") {
  deleteBootcamps();
}

if (process.argv[2] === "--import-courses") {
  importCourses();
} else if (process.argv[2] === "--delete-courses") {
  deleteCourses();
}

if (process.argv[2] === "--import-reviews") {
  importReviews();
} else if (process.argv[2] === "--delete-reviews") {
  deleteReviews();
}

if (process.argv[2] === "--import-users") {
  importUsers();
} else if (process.argv[2] === "--delete-users") {
  deleteUsers();
}
