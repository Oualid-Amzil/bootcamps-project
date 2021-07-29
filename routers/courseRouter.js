const express = require("express");
const courseController = require("./../controllers/courseController");

const Router = express.Router();

Router.route("/")
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

Router.route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = Router;
