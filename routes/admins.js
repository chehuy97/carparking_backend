const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/customers", adminController.show_all_customers);
router.get("/owners", adminController.show_all_owners);
router.get("/transactions", adminController.show_all_transactions);

module.exports = router;
