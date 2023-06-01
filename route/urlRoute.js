const express = require("express");
const controller = require("../controller/urlController");
const router = express.Router();
const {authenticateUser} = require("../middleware/authentication");

router.post("/",  authenticateUser, controller.post);
router.get("/history",  controller.urlHistory);

module.exports = router;
