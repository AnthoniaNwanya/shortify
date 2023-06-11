const express = require("express");
const controller = require("../controller/userController");
const router = express.Router();
const {authenticateUser} = require("../middleware/authentication");
const  {validateRequest} = require("../middleware/validateReq");
const {userUpdateValidation} = require("../validation/userSchema");

router.get("/", controller.getUsers);
router.get("/:email", controller.getOne);
router.post("/update/:id", authenticateUser, validateRequest(userUpdateValidation), controller.updateOne);
router.post("/delete/:id", authenticateUser, controller.deleteOne);

module.exports = router;
