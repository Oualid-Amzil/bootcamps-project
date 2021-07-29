const express = require("express");
const bootcampController = require("./../controllers/bootcampController");
const authController = require("./../controllers/authController");

const Router = express.Router();

Router.route("/")
  .get(
    authController.protect,
    authController.restrictTo("publisher", "admin"),
    bootcampController.getAllBootcamps
  )
  .post(
    authController.protect,
    authController.restrictTo("publisher", "admin"),
    bootcampController.createBootcamp
  );

Router.route("/:id")
  .get(bootcampController.getBootcamp)
  .patch(
    authController.protect,
    authController.restrictTo("publisher", "admin"),
    bootcampController.updateBootcamp
  )
  .delete(
    authController.protect,
    authController.restrictTo("publisher", "admin"),
    bootcampController.deleteBootcamp
  );

module.exports = Router;
