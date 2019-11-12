const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");

router.get("/", accountController.show_all_accounts);
router.get("/:accountId", accountController.show_account_detail);
router.post("/login", authController.login);
router.post("logout", authController.logout);

router.put("/:accountId", accountController.edit_account);

module.exports = router;
