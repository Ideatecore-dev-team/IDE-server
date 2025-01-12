const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

// create
router.post("/", authentication, controller.create);

// get all
router.get("/", controller.getAll);

// get by id
router.get("/:partnerId", controller.getById);

// update
router.put("/:partnerId", authentication, controller.update);

// remove
router.delete("/:partnerId", authentication, controller.remove);

module.exports = router;
