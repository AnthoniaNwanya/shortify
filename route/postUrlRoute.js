const express = require("express");
const controller = require("../controller/urlController");
const router = express.Router();


router.post("/:email", controller.post);
router.get("/", controller.getAll);

module.exports = router;
