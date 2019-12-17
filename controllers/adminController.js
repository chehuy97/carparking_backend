const { logger } = require("../middlewares/logging");
const ErrorHelper = require("../helpers/ErrorHelper");
const { Account, Role, Transaction, Yard, Report } = require("../startup/db");

const show_all_customers = async (req, res) => {
  try {
    let customers = await Account.findAll({
      include: [
        {
          model: Role,
          where: { id: 3 },
          through: { attributes: [] }
        }
      ]
    });
    res.json(customers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
const show_all_owners = async (req, res) => {
  try {
    let owners = await Account.findAll({
      include: [
        {
          model: Role,
          where: { id: 2 },
          through: { attributes: [] }
        }
      ]
    });
    res.json(owners);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
const show_all_transactions = async (req, res) => {
  try {
    let transactions = await Transaction.findAll({
      include: [
        {
          model: Account,
          attributes: ["name"]
        },
        {
          model: Yard,
          include: [{ model: Account, attributes: ["name"] }]
        }
      ]
    });
    res.json(transactions);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_all_reports = async (req, res) => {
  try {
    let reports = await Report.findAll({
      include: [
        {
          model: Transaction
        }
      ]
    });
    res.json(reports);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_all_customers,
  show_all_owners,
  show_all_transactions,
  show_all_reports
};
