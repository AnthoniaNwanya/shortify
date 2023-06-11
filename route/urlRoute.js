const express = require("express");
const controller = require("../controller/urlController");
const router = express.Router();
const {authenticateUser} = require("../middleware/authentication");
const  {validateRequest} = require("../middleware/validateReq");
const {postUrlValidation} = require("../validation/urlSchema")

router.post("/", authenticateUser, validateRequest(postUrlValidation), controller.post);
router.get("/history", authenticateUser, controller.urlHistory);
router.get("/analytics", authenticateUser, controller.urlAnalytics);

module.exports = router;
