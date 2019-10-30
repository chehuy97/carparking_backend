const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");

const AccountModel = require("../models/account");
//const ProfileModel = require("../models/profile");
const RoleModel = require("../models/role");
const CarModel = require("../models/car");
const YardModel = require("../models/yard");
const HistoryModel = require("../models/history");
const ParkingNowModel = require("../models/parkingNow");
const TimeBookingModel = require("../models/timeBooking");

var dbConfig = {
  username: "root",
  password: "",
  database: "carparkingdb2",
  host: "localhost",
  dialect: "mysql",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_520_ci",
    timestamps: false
  }
};

const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

db.authenticate()
  .then(() => {
    console.log("Connection hes been establish successfully");
  })
  .catch(err => {
    console.error("Unable connect th the database", err);
  });

const fakeData = true;
db.sync({
  force: fakeData
}).then(() => {
  logger.info("DATABASE & TABLES CREATED");
  if (fakeData) {
    applyFake();
  }
});

const Account = AccountModel(db, Sequelize);
//const Profile = ProfileModel(db, Sequelize);
const Role = RoleModel(db, Sequelize);
const AccountRole = db.define("account_role", {}, { timestamps: false });
const Car = CarModel(db, Sequelize);
const Yard = YardModel(db, Sequelize);
const History = HistoryModel(db, Sequelize);
const ParkingNow = ParkingNowModel(db, Sequelize);
const TimeBooking = TimeBookingModel(db, Sequelize);

Account.belongsToMany(Role, { through: AccountRole });
Role.belongsToMany(Account, { through: AccountRole });

// Profile.belongsTo(Account);
// Account.hasOne(Profile);

Car.belongsTo(Account);
Account.hasOne(Car);

Yard.belongsTo(Account);
Account.hasOne(Yard);

TimeBooking.belongsTo(Car);
Car.hasOne(TimeBooking);

TimeBooking.belongsTo(Yard);
Yard.hasOne(TimeBooking);

ParkingNow.belongsTo(Car);
Car.hasOne(ParkingNow);

ParkingNow.belongsTo(Yard);
Yard.hasOne(ParkingNow);

History.belongsTo(Car);
Car.hasOne(History);

History.belongsTo(Yard);
Yard.hasOne(History);

const applyFake = async () => {
  //fake account
  account1 = await Account.create({
    username: "chehuy97",
    password: "123456",
    name: "Che Quang Huy",
    birthday: "1997-10-09",
    gender: "Male",
    phone: "0763129730",
    image: "gdausd4r234hkdshfdksf",
    balance: 120000
  });
  account2 = await Account.create({
    username: "nguyenan96",
    password: "123456",
    name: "Nguyen Duc An",
    birthday: "1996-07-06",
    gender: "Male",
    phone: "0796839767",
    image: "gdausd4r234hkdfdff",
    balance: 1346000
  });
  account3 = await Account.create({
    username: "lebinh94",
    password: "123456",
    name: "Le Thi Binh",
    birthday: "1994-07-12",
    gender: "Female",
    phone: "0796983674",
    image: "gdausd4r234hkdfdff",
    balance: 546000
  });
  account4 = await Account.create({
    username: "TranCuong95",
    password: "123456",
    name: "Tran Van Cuong",
    birthday: "1995-09-19",
    gender: "Male",
    phone: "0797903674",
    image: "sdadgre54dsf33424324ewdw",
    balance: 5646000
  });
  //fake role
  role1 = await Role.create({
    roleId: 1,
    role_name: "admin"
  });
  role2 = await Role.create({
    roleId: 2,
    role_name: "owner"
  });
  role1 = await Role.create({
    roleId: 3,
    role_name: "customer"
  });
  //fake car
  car1 = await Car.create({
    color: "red",
    brand: "toyota",
    car_type: "4-8",
    point: "3",
    car_number: "HR26DK8337",
    accountAccountId: 1
  });
  car2 = await Car.create({
    color: "black",
    brand: "hyundai",
    car_type: "4-8",
    point: "3",
    car_number: "HT26VB1986",
    accountAccountId: 4
  });
  car3 = await Car.create({
    color: "red",
    brand: "hyundai",
    car_type: "4-8",
    point: "3",
    car_number: "VK96DE9864",
    accountAccountId: 1
  });
  //fake yard
  yard1 = await Yard.create({
    acreage: 34,
    point: 12,
    status: 1,
    address: "362 Dong Da",
    latitude: 16.074309,
    longitude: 108.21422,
    accountAccountId: 2
  });
  yard1 = await Yard.create({
    acreage: 59,
    point: 14,
    status: 1,
    address: "74 Chi Lang",
    latitude: 16.068639,
    longitude: 108.21545,
    accountAccountId: 3
  });
  //fake account_role
  account_role1 = await AccountRole.create({
    accountAccountId: 1,
    roleRoleId: 3
  });
  account_role2 = await AccountRole.create({
    accountAccountId: 2,
    roleRoleId: 2
  });
  account_role3 = await AccountRole.create({
    accountAccountId: 3,
    roleRoleId: 2
  });
  account_role4 = await AccountRole.create({
    accountAccountId: 4,
    roleRoleId: 3
  });
};

module.exports = {
  Account,
  Car,
  History,
  ParkingNow,
  TimeBooking,
  Yard,
  AccountRole,
  Role
};
