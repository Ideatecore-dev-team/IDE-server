const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");
const authorization = require("../../middleware/authorization");

const router = express.Router();

// register
router.post("/", authentication, authorization, controller.register);

// get all user
router.get("/", authentication, authorization, controller.getAllUser);

// get user by id
router.get("/:userId", authentication, authorization, controller.getUserById);

// update user by id
router.put(
  "/:userId",
  authentication,
  authorization,
  controller.updateUserById,
);

// update password by id
router.put(
  "/:userId/password",
  authentication,
  authorization,
  controller.updatePasswordById,
);

// remove user by id
router.delete("/:userId", authentication, authorization, controller.remove);

module.exports = router;
