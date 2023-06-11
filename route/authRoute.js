const express = require("express");
const controller = require("../controller/userController");
const router = express.Router();
const  {validateRequest} = require("../middleware/validateReq");
const  {userSignUpValidation} = require("../validation/userSchema");

router.post("/signup", validateRequest(userSignUpValidation), controller.signup);
router.post("/login", controller.login);

module.exports = router;
