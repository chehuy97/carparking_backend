const { Account, Role } = require("../startup/db");
const ErrorHelper = require("../helpers/ErrorHelper");
const jwt = require("jsonwebtoken");
const { logger } = require("../middlewares/logging");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const login = async (req, res) => {
  try {
    let account = await Account.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      },
      include: [
        {
          model: Role,
          where: { [Op.or]: [{ id: [1, 2, 3] }] },
          through: { attributes: [] }
        }
      ]
      // attributes: ["id", "name"]
    });
    if (!account) {
      res.json("wrong");
    }
    const token = jwt.sign(account.toJSON(), "Arthur ", {
      algorithm: "HS256",
      expiresIn: "3h"
    });
    // const refreshToken = jwt.sign(
    //   account.toJSON(),
    //   "arthur",
    //   {
    //     algorithm: 'HS256',
    //     expiresIn: "3h"
    //   }
    // );
    const response = {
      token,
      // refreshToken,
      account
    };
    res.json(response);
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error);
  }
};

const logout = async (req, res) => {
  try {
    let token = req.body.token;
    let success = await ExpiredToken.create({
      token: token
    });
    if (success) {
      res.json(null);
    } else {
      Error.InternalServerError(res, error);
    }
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  login,
  logout
};
