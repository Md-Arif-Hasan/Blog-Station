const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers).post("/", userController.createUser);;
router.get("/:username", userController.getUserByUserName).put("/:username", userController.updateUser).delete("/:username", userController.deleteUser);
module.exports = router;
