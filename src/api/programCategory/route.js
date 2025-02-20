const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

router.post("/", authentication, controller.create);
router.get("/", controller.getAllCategory);
router.get("/:categoryId", controller.getCategoryById);
router.put("/:categoryId", authentication, controller.updateCategory);
router.delete("/:categoryId", authentication, controller.deleteCategory);

module.exports = router;
