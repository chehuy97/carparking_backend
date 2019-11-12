const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/owneraddress", customerController.show_onwers_address);
router.get("/owneraddress/:yardId", customerController.show_yards_details);

router.get("/:accountId", customerController.show_customer_detail);
router.get("/:accountId/cars/", customerController.show_all_cars);
router.get("/cars/:accountId", customerController.show_customer_cars);
router.put("/:accountId", customerController.edit_customer);
router.post("/", customerController.register_customer);

module.exports = router;
