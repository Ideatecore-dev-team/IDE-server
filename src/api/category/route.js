const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

router.post("/", authentication, controller.create);

module.exports = router;
