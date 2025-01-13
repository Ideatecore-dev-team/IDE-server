const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

router.post("/", authentication, controller.create);
router.get("/:articleId", controller.getArticleById);
router.put("/:articleId", authentication, controller.updateArticleById);
router.delete("/:articleId", authentication, controller.deleteArticleById);
router.get("/", controller.getAllArticle);

module.exports = router;
