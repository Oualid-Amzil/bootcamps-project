const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const Router = express.Router();

Router.post("/sign-up", authController.signUp);
Router.post("/log-in", authController.logIn);

Router.post("/forgotMyPassword", authController.forgotPassword);
Router.patch("/resetPassword/:token", authController.resetPassword);

Router.route("/updateMyPassword").patch(
  authController.protect,
  authController.updatePassowrd
);

Router.route("/updateMe").patch(
  authController.protect,
  userController.updateMe
);

Router.route("/deleteMe").patch(
  authController.protect,
  userController.deleteMe
);

Router.route("/")
  .get(
    authController.protect,
    authController.restrictTo("publisher", "admin"),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    authController.restrictTo("publisher", "admin"),
    userController.createUser
  );

Router.route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("publisher", "admin"),
    userController.getUser
  )
  .patch(
    authController.protect,
    authController.restrictTo("publisher", "admin"),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo("publisher", "admin"),
    userController.deleteUser
  );

module.exports = Router;
