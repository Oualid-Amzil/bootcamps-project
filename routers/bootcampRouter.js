const express = require("express");
const bootcampsController = require("./../controllers/bootcampControllers");

const router = express.Router();

router
  .route("/")
  .get(bootcampsController.getAllBootcamps)
  .post(bootcampsController.createBootcamp);

router
  .route("/:id")
  .get(bootcampsController.getBootcamp)
  .patch(bootcampsController.updateBootcamp)
  .delete(bootcampsController.deleteBootcamp);

module.exports = router;
