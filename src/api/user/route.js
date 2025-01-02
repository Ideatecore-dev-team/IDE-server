const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/getuser", authentication, controller.getUser);
router.put("/changepassword", authentication, controller.changePassword);
router.delete("/logout", authentication, controller.logout);

module.exports = router;
