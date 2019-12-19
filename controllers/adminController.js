const { logger } = require("../middlewares/logging");
const ErrorHelper = require("../helpers/ErrorHelper");
const {
  Account,
  Role,
  Transaction,
  Yard,
  Report,
  Car
} = require("../startup/db");

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
const report_handling = async (req, res) => {
  try {
    let report = await Report.findOne({
      where: { id: req.params.reportId },
      include: [
        {
          model: Transaction
        }
      ]
    });
    let customerViolation = await Account.findOne({
      include: {
        model: Car,
        where: { car_number: report.car_number }
      }
    });
    var newBalance = customerViolation.balance - 2 * report.transaction.price;
    let updateCustomer = await Account.update(
      { balance: newBalance },
      { where: { id: customerViolation.id } }
    );
    let deleteReport = await Report.destroy({
      where: { id: report.id }
    });
    res.json(updateCustomer);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
module.exports = {
  show_all_customers,
  show_all_owners,
  show_all_transactions,
  show_all_reports,
  report_handling
};
