const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

router.post("/", authentication, controller.create);
router.get("/:programId", controller.getProgramById);
router.put("/:programId", authentication, controller.updateProgramById);
router.delete("/:programId", authentication, controller.deleteProgram);
router.get("/", controller.getAllProgram);

module.exports = router;
