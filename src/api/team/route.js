const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

router.post("/", authentication, controller.create);
// get all
router.get("/", controller.getAll);
// get by id
router.get("/:teamId", controller.getById);
// update
router.put("/:teamId", authentication, controller.update);
// remove
router.delete("/:teamId", authentication, controller.remove);

module.exports = router;
