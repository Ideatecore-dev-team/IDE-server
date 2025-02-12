const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

// create
router.post("/", authentication, controller.create);

// get all
router.get("/", controller.getAll);

// get by id
router.get("/:galleryId", controller.getById);

// update
router.put("/:galleryId", authentication, controller.updateById);

// remove

module.exports = router;
