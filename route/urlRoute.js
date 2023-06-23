const express = require("express");
const controller = require("../controller/urlController");
const router = express.Router();
const {authenticateUser} = require("../middleware/authentication");
const GetCache = require('../middleware/cache');

router.post("/", authenticateUser, controller.post);
router.get("/history", GetCache, authenticateUser, controller.urlHistory);
router.get("/analytics", GetCache, authenticateUser, controller.urlAnalytics);

module.exports = router;
