const express = require("express");
const controller = require("../controller/userController");
const router = express.Router();

router.post("/signup",  controller.signup);
// router.get("/signup", controller.signupView);
router.post("/login", controller.login);

module.exports = router;
