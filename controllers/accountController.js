const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");
const Op = Sequelize.Op;
const ErrorHelper = require("../helpers/ErrorHelper");
const { Account } = require("../startup/db");

const show_all_accounts = async (req, res) => {
  try {
    let accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_all_accounts
};
