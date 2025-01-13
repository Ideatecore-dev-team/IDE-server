const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

router.post("/", authentication, controller.create);
router.get("/", controller.getAllTeamCategory);
router.get("/:teamCategoryId", controller.getAllTeamCategoryById);
router.put("/:teamCategoryId", authentication, controller.updateTeamCategory);
router.delete(
  "/:teamCategoryId",
  authentication,
  controller.deleteTeamCategory,
);

module.exports = router;
