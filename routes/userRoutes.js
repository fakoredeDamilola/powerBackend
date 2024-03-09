const express = require("express");
const { registerUser, authUser } = require("../controller/userController");
const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(authUser);

module.exports = router;
