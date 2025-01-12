const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

// create
router.post("/", authentication, controller.create);

// get
router.get("/", controller.get);

// update
router.put("/", authentication, controller.update);

module.exports = router;
