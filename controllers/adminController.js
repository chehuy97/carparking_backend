const { logger } = require("../middlewares/logging");
const ErrorHelper = require("../helpers/ErrorHelper");
const { Account, AccountRole, Car, Role } = require("../startup/db");

const show_list_account = async (req, res) => {
  try {
    let accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_list_customers = async (req, res) => {
  try {
    let customers = await Account.findAll({
      include: [{ model: Role, where: { id: 3 }, through: { attributes: [] } }]
    });
    res.json(customers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_list_owners = async (req, res) => {
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

const show_list_cars = async (req, res) => {
  try {
    let cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_list_yards = async (req, res) => {
  try {
    let yards = await Yard.findAll();
    res.json(yards);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_list_account,
  show_list_customers,
  show_list_owners,
  show_list_cars,
  show_list_yards
  // show_list_banned,
  // show_list_histories,
  // show_list_parking_now,
  // show_listbooking_time
};
