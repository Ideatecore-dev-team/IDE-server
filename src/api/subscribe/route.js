const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

// create
router.post("/", controller.create);

// get all
router.get("/", authentication, controller.getAll);

// get by id
router.get("/:subscribeId", authentication, controller.getById);

// update
router.put("/:subscribeId", authentication, controller.update);

// remove
router.delete("/:subscribeId", authentication, controller.remove);

module.exports = router;
