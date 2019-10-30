const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");
const Op = Sequelize.Op;
const ErrorHelper = require("../helpers/ErrorHelper");
const { Account, AccountRole, Car, Role } = require("../startup/db");

const show_list_customers = async (req, res) => {
  try {
    let customers = await Account.findAll({
      include: [
        { model: Role, where: { roleId: 3 }, through: { attributes: [] } }
      ]
    });
    res.json(customers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_customer_detail = async (req, res) => {
  try {
    let customers = await Account.findOne({
      where: { accountId: req.params.accountId }
    });
    res.json(customers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const edit_customer = async (req, res) => {
  try {
    let customers = await Account.update(
      {
        accountId: req.body.accountId,
        username: req.body.username,
        password: req.body.password,
        status: req.body.status,
        name: req.body.name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        phone: req.body.phone,
        image: req.body.image,
        balance: req.body.balance
      },
      {
        where: { accountId: req.params.accountId }
      }
    );
    res.json(customers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_all_cars = async (req, res) => {
  try {
    let cars = await Car.findAll({
      where: { accountAccountId: req.params.accountId }
    });
    res.json(cars);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_list_customers,
  show_all_cars,
  show_customer_detail,
  edit_customer
};
