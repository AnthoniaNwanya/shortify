const express = require("express");
const controller = require("../controller/userController");
const router = express.Router();
const {authenticateUser} = require("../middleware/authentication");

router.get("/", controller.getUsers);
router.get("/:email", controller.getOne);
router.post("/update/:id", authenticateUser, controller.updateOne);
router.post("/delete/:id", authenticateUser, controller.deleteOne);

module.exports = router;
