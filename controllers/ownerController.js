const { logger } = require("../middlewares/logging");
const ErrorHelper = require("../helpers/ErrorHelper");
const {
  Account,
  Yard,
  Role,
  Transaction,
  YardSchedule
} = require("../startup/db");

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

const show_history = async (req, res) => {
  try {
    let trans = await Transaction.findAll({
      include: [
        {
          model: Yard,
          attributes: ["accountId"],
          where: { accountId: req.params.accountId }
        },
        { model: Account, attributes: ["name"] }
      ]
    });
    res.json(trans);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_owner_detail = async (req, res) => {
  try {
    let owner = await Account.findOne({
      where: { id: req.params.accountId }
    });
    res.json(owner);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const edit_owner = async (req, res) => {
  try {
    let owner = await Account.update(
      {
        username: req.body.username,
        password: req.body.password,
        status: req.body.status,
        name: req.body.name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        phone: req.body.phone,
        image: req.body.image
      },
      {
        where: { id: req.params.accountId }
      }
    );
    res.json(owner);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_yards = async (req, res) => {
  try {
    let yards = await Yard.findOne({
      where: { accountId: req.params.accountId }
    });
    res.json(yards);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
const show_owner_yard_detail = async (req, res) => {
  try {
    let yard = await Yard.findOne({
      where: { accountId: req.params.accountId, id: req.params.yardId }
    });
    res.json(yard);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
const change_time_schedules = async (req, res) => {
  try {
    let yard_schedules = await YardSchedule.create({
      day: req.body.day,
      time_open: req.body.time_open,
      time_close: req.body.time_close,
      status: req.body.status,
      yardId: req.body.yardId
    });
    res.json(yard_schedules);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
module.exports = {
  show_list_owners,
  show_yards,
  show_owner_detail,
  edit_owner,
  show_owner_yard_detail,
  show_history,
  change_time_schedules
};
