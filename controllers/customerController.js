const { logger } = require("../middlewares/logging");
const ErrorHelper = require("../helpers/ErrorHelper");
const { Account, Car, Role, Yard, Slot, History } = require("../startup/db");

const show_onwers_address = async (req, res) => {
  try {
    let owners = await Account.findAll({
      include: [
        {
          model: Role,
          where: { id: 2 },
          through: { attributes: [] }
        },
        {
          model: Yard
        }
      ]
    });
    res.json(owners);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_yards_details = async (req, res) => {
  try {
    var d = new Date().getDate();
    var m = new Date().getMonth() + 1;
    var y = new Date().getFullYear();
    var today = y + "-" + m + "-" + d;
    var yard = await Yard.findOne({
      where: { id: req.params.yardId },
      include: [
        {
          model: Slot
        }
      ]
    });
    const timeBooked = [];
    for (i = 0; i < yard.slots.length; i++) {
      let histories = await History.findAll({
        where: { day: today, slotId: yard.slots[i].id }
      });
      for (j = 0; j < histories.length; j++) {
        for (k = histories[j].time_come; k < histories[j].time_leave; k++) {
          timeBooked.push({
            keySlot: i,
            keyBooked: k
          });
        }
      }
    }

    for (i = 0; i < yard.slots.length; i++) {
      const time = [];
      for (j = 0; j < 24; j++) {
        time[j] = yard.slots[i].times[j];
      }
      timeBooked.map(item => {
        if (item.keySlot === i) {
          time[item.keyBooked] = "1";
        }
      });
      yard.slots[i].times = time;
    }

    res.json(yard);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const register_customer = async (req, res) => {
  try {
    let customer = await Account.create({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      birthday: req.body.birthday,
      gender: req.body.gender,
      phone: req.body.phone,
      image: "gdausd4r2346hkdshfdksf",
      balance: 120000
      // roles: [
      //   {
      //     id: 3,
      //     role_name: "customer"
      //   }
      // ],
      // car: {
      //   color: req.body.color,
      //   brand: req.body.brand,
      //   car_number: req.body.car_number,
      //   accountId: req.body.accountId
      // }
    });
    res.json(customer);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_customer_detail = async (req, res) => {
  try {
    let customer = await Account.findOne({
      where: { id: req.params.accountId },
      include: [
        {
          model: Car
        }
      ]
    });
    res.json(customer);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const edit_customer = async (req, res) => {
  try {
    let customers = await Account.update(
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
    res.json(customers);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_all_cars = async (req, res) => {
  try {
    let cars = await Car.findAll({
      where: { accountId: req.params.accountId }
    });
    res.json(cars);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
const show_customer_cars = async (req, res) => {
  try {
    let car = await Car.findAll({
      where: { accountId: req.params.accountId }
    });
    res.json(car);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

module.exports = {
  show_onwers_address,
  show_yards_details,
  show_all_cars,
  show_customer_detail,
  edit_customer,
  show_customer_cars,
  register_customer
};
