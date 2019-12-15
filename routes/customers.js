const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/owneraddress", customerController.show_onwers_address);

router.get(
  "/owneraddress/search/:search_result",
  customerController.search_address
);
router.get(
  "/owneraddress/:yardId/:date",
  customerController.show_yards_details
);
router.get(
  "/owneraddress/nearest/:latitude/:longitude",
  customerController.show_nearest_address
);

router.get("/histories/:accountId", customerController.show_histories);
router.post("/histories/reports", customerController.send_report);

router.get("/:accountId", customerController.show_customer_detail);
router.get("/:accountId/cars/", customerController.show_all_cars);
router.get("/cars/:accountId", customerController.show_customer_cars);
router.put("/:accountId", customerController.edit_customer);
router.post("/", customerController.register_customer);
router.post("/address/booking/", customerController.booking);

module.exports = router;
