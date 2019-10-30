const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
// const userController = require("../controllers/authControllers");

router.get("/", ownerController.show_list_owners);
router.get("/yards", ownerController.show_all_yards);

module.exports = router;
