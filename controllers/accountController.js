const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");
const Op = Sequelize.Op;
const ErrorHelper = require("../helpers/ErrorHelper");
const { Account, Car } = require("../startup/db");

const show_all_accounts = async (req, res) => {
  try {
    let accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
const show_account_detail = async (req, res) => {
  try {
    let account = await Account.findOne({
      where: { id: req.params.accountId }
    });
    res.json(account);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
const edit_account = async (req, res) => {
  try {
    let account = await Account.update(
      {
        // username: req.body.username,
        // password: req.body.password,
        // status: req.body.status,
        name: req.body.name
        // birthday: req.body.birthday,
        // gender: req.body.gender,
        // phone: req.body.phone,
        // image: req.body.image
      },
      {
        where: { id: req.params.accountId }
      }
    );
    res.json(account);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_all_accounts,
  show_account_detail,
  edit_account
};
