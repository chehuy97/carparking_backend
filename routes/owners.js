const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
// const userController = require("../controllers/authControllers");
router.get("/", ownerController.show_list_owners);
router.get("/:accountId", ownerController.show_owner_detail);
router.put("/:accountId", ownerController.edit_owner);

router.get("/:accountId/yards/", ownerController.show_all_yards);
router.get("/:accountId/yards/:yardId", ownerController.show_owner_yard_detail);

module.exports = router;
