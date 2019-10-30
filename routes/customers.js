const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
// const userController = require("../controllers/authControllers");

router.get("/", customerController.show_list_customers);

router.get("/:accountId", customerController.show_customer_detail);
router.put("/:accountId", customerController.edit_customer);

router.get("/cars/:accountId", customerController.show_all_cars);

module.exports = router;
