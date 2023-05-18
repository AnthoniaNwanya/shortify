const express = require("express");
const controller = require("../controller/userController");
const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getUsers);
router.get("/:email", controller.getOne);
// Get History of User urls
router.get("/:email/history", controller.getHistory);

router.put("/:id", controller.updateOne);
router.delete("/:id", controller.deleteOne);

module.exports = router;
