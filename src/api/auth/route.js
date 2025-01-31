const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

// login
router.post("/login", controller.login);

// logout
router.delete("/logout", authentication, controller.logout);

// changepassword
router.put("/changepassword", authentication, controller.changePassword);

// getuser
router.get("/getuser", authentication, controller.getUser);

module.exports = router;
