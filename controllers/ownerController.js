const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");
const ErrorHelper = require("../helpers/ErrorHelper");
const { Account, AccountRole, Yard, Role } = require("../startup/db");

const show_list_owners = async (req, res) => {
  try {
    let owners = await Account.findAll({
      include: [
        {
          model: Role,
          where: { roleId: 2 },
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

const show_all_yards = async (req, res) => {
  try {
    let yards = await Yard.findAll();
    res.json(yards);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_list_owners,
  show_all_yards
};
