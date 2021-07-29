const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");

const Router = express.Router();

Router.route("/")
  .get(authController.protect, reviewController.getAllReviews)
  .post(reviewController.createReview);

Router.route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = Router;
