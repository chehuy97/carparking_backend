const { logger } = require("../middlewares/logging");
const ErrorHelper = require("../helpers/ErrorHelper");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  Account,
  Car,
  Role,
  Yard,
  Transaction,
  YardSchedule,
  Report
} = require("../startup/db");

var d = new Date().getDate();
var m = new Date().getMonth() + 1;
var y = new Date().getFullYear();
var today = y + "-" + m + "-" + d;
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
    var yard = await Yard.findOne({
      where: { id: req.params.yardId }
    });

    let yardSchedule = await YardSchedule.findOne({
      where: { day: req.params.date, yardId: req.params.yardId }
    });
    if (yardSchedule !== null) {
      yard.time_open = yardSchedule.time_open;
      yard.time_close = yardSchedule.time_close;
      const timeYard = [];
      for (i = 0; i < 24; i++) {
        if (i < yard.time_open || i >= yard.time_close) {
          timeYard[i] = "*";
        } else {
          timeYard[i] = "0";
        }
      }
      yard.times = timeYard;
    }
    var currenTime = new Date().getHours();
    if (today === req.params.date) {
      const timeYard = [];
      for (i = 0; i < 24; i++) {
        if (
          i < yard.time_open ||
          i >= yard.time_close ||
          (currenTime > yard.time_open && i < currenTime)
        ) {
          timeYard[i] = "*";
        } else {
          timeYard[i] = "0";
        }
      }
      yard.times = timeYard;
    }
    const timeBooked = [];
    let transaction = await Transaction.findAll({
      where: { day: req.params.date, yardId: req.params.yardId }
    });
    const number = [];
    for (i = 0; i < transaction.length; i++) {
      for (j = transaction[i].time_come; j < transaction[i].time_leave; j++) {
        number.push({ key: j });
      }
    }
    for (i = yard.time_open; i < yard.time_close; i++) {
      var parking = 0;
      for (j = 0; j < number.length; j++) {
        if (i === number[j].key) {
          parking++;
        }
      }
      timeBooked.push({ key: i, parking: parking });
    }

    const time = [];
    for (i = 0; i < 24; i++) {
      time[i] = yard.times[i];
    }
    timeBooked.map(item => {
      if (item.parking === yard.slot) {
        if (req.params.date === today && item.key < currenTime) {
          time[item.key] = "*";
        } else {
          time[item.key] = "1";
        }
      }
    });
    yard.times = time;
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

const booking = async (req, res) => {
  try {
    let transactions = await Transaction.findAll({
      where: {
        day: req.body.day,
        time_come: req.body.time_come,
        yardId: req.body.yardId
      }
    });
    var slot = transactions.length + 1;
    let transaction = Transaction.create({
      day: req.body.day,
      time_come: req.body.time_come,
      time_leave: req.body.time_leave,
      price: req.body.price,
      car_number: req.body.car_number,
      slot: slot,
      accountId: req.body.accountId,
      yardId: req.body.yardId
    });
    let customer = await Account.findOne({
      where: { id: req.body.accountId }
    });
    var price = customer.balance - req.body.price;
    let updateCustomer = await Account.update(
      { balance: price },
      { where: { id: req.body.accountId } }
    );
    res.json(slot);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const show_histories = async (req, res) => {
  try {
    let histories = await Transaction.findAll({
      where: { accountId: req.params.accountId },
      include: [
        {
          model: Yard,
          include: [
            {
              model: Account
            }
          ]
        }
      ],
      order: [["id", "DESC"]]
    });
    res.json(histories);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const search_address = async (req, res) => {
  try {
    let result = await Account.findAll({
      include: [
        {
          model: Role,
          where: {
            id: 2
          },
          through: { attributes: [] }
        },
        {
          model: Yard,
          where: {
            address: {
              [Op.substring]: req.params.search_result
            }
          }
        }
      ]
    });
    // if (result === 0) {
    //   res.json("No Result");
    // } else {
    //   res.json(result);
    // }
    res.json(result);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};
const show_nearest_address = async (req, res) => {
  try {
    var yards = await Account.findAll({
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
    var distance = 1;
    var index = 0;
    for (i = 0; i < yards.length; i++) {
      const tampDistance = Math.sqrt(
        Math.pow(req.params.latitude - yards[i].yard.latitude, 2) +
          Math.pow(req.params.longitude - yards[i].yard.longitude, 2),
        2
      );
      if (tampDistance < distance) {
        distance = tampDistance;
        index = i;
      }
    }
    res.json(yards[index]);
  } catch (error) {
    logger.error(error.message, error);
    ErrorHelper.InternalServerError(res, error);
  }
};

const send_report = async (req, res) => {
  try {
    let report = await Report.create({
      car_number: req.body.car_number,
      transactionId: req.body.transactionId
    });
    res.json(report);
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
  register_customer,
  booking,
  show_histories,
  search_address,
  show_nearest_address,
  send_report
};
