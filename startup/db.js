const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");

const AccountModel = require("../models/account");
//const ProfileModel = require("../models/profile");
const RoleModel = require("../models/role");
const CarModel = require("../models/car");
const YardModel = require("../models/yard");
const SlotModel = require("../models/slot");
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
const Slot = SlotModel(db, Sequelize);
const History = HistoryModel(db, Sequelize);
const ParkingNow = ParkingNowModel(db, Sequelize);
const TimeBooking = TimeBookingModel(db, Sequelize);

Account.belongsToMany(Role, { through: AccountRole });
Role.belongsToMany(Account, { through: AccountRole });

// Profile.belongsTo(Account);
// Account.hasOne(Profile);

Car.belongsTo(Account);
Account.hasMany(Car);

Yard.belongsTo(Account);
Account.hasOne(Yard);

Slot.belongsTo(Yard);
Yard.hasMany(Slot);

TimeBooking.belongsTo(Car);
Car.hasOne(TimeBooking);

TimeBooking.belongsTo(Yard);
Yard.hasOne(TimeBooking);

ParkingNow.belongsTo(Car);
Car.hasOne(ParkingNow);

ParkingNow.belongsTo(Yard);
Yard.hasOne(ParkingNow);

History.belongsTo(Account);
Account.hasMany(History);

History.belongsTo(Yard);
Yard.hasMany(History);

const applyFake = async () => {
  //fake account
  account1 = await Account.create({
    username: "chehuy97",
    password: "123456",
    name: "Che Quang Huy",
    birthday: "1997-10-09",
    gender: "Male",
    phone: "0763129730",
    image:
      "https://i.pinimg.com/originals/69/36/ca/6936cae9fc169732b6d933305571f402.jpg",
    balance: 120000
  });
  account2 = await Account.create({
    username: "nguyenan96",
    password: "123456",
    name: "Nguyen Duc An",
    birthday: "1996-07-06",
    gender: "Male",
    phone: "0796839767",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg",
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
    username: "trancuong95",
    password: "123456",
    name: "Tran Van Cuong",
    birthday: "1995-09-19",
    gender: "Male",
    phone: "0797903674",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 5646000
  });
  account5 = await Account.create({
    username: "nguyendung92",
    password: "123456",
    name: "Nguyen Thi Dung",
    birthday: "1992-01-02",
    gender: "Female",
    phone: "0986123865",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 46000
  });
  //fake role
  role1 = await Role.create({
    id: 1,
    role_name: "admin"
  });
  role2 = await Role.create({
    id: 2,
    role_name: "owner"
  });
  role1 = await Role.create({
    id: 3,
    role_name: "customer"
  });
  //fake car
  car1 = await Car.create({
    color: "red",
    brand: "toyota",
    // car_type: "4-8",
    // point: "3",
    car_number: "HR26DK8337",
    accountId: 1
  });
  car2 = await Car.create({
    color: "black",
    brand: "hyundai",
    // car_type: "4-8",
    // point: "3",
    car_number: "HT26VB1986",
    accountId: 4
  });
  car3 = await Car.create({
    color: "red",
    brand: "hyundai",
    // car_type: "4-8",
    // point: "3",
    car_number: "VK96DE9864",
    accountId: 1
  });
  //fake yard
  yard1 = await Yard.create({
    acreage: 34,
    // point: 12,
    status: 1,
    address: "362 Dong Da",
    image_yard: "http://dananghouse.com.vn/wp-content/uploads/IMAG0074.jpg",
    latitude: 16.074309,
    longitude: 108.21422,
    time_open: 6,
    time_close: 18,
    price: 15000,
    accountId: 2
  });
  yard2 = await Yard.create({
    acreage: 59,
    // point: 14,
    status: 1,
    address: "74 Chi Lang",
    image_yard:
      "https://media-cdn.tripadvisor.com/media/photo-s/10/38/75/c5/karma-waters-restaurant.jpg",
    latitude: 16.068639,
    longitude: 108.21545,
    time_open: 6,
    time_close: 20,
    price: 20000,
    accountId: 3
  });
  yard3 = await Yard.create({
    acreage: 44,
    // point: 14,
    status: 1,
    address: "86 Duy Tan",
    image_yard:
      "https://cloud.muaban.net/images/thumb-detail/2019/09/21/312/db11c30d6e9349e39c4ed395f0aabc37.jpg",
    latitude: 16.049312,
    longitude: 108.212065,
    time_open: 5,
    time_close: 22,
    price: 20000,
    accountId: 5
  });
  //fake slot
  slot1 = await Slot.create({
    id: "2a1",
    yardId: 1,
    times: [
      "*",
      "*",
      "*",
      "*",
      "*",
      "*",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "*",
      "*",
      "*",
      "*",
      "*",
      "*"
    ]
    // time7_8: 1,
    // time8_9: 1
  });
  slot2 = await Slot.create({
    id: "2a2",
    yardId: 1,
    times: [
      "*",
      "*",
      "*",
      "*",
      "*",
      "*",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "*",
      "*",
      "*",
      "*",
      "*",
      "*"
    ]
  });
  slot3 = await Slot.create({
    id: "3b1",
    yardId: 2,
    times: [
      "*",
      "*",
      "*",
      "*",
      "*",
      "*",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "*",
      "*",
      "*",
      "*"
    ]
  });
  slot4 = await Slot.create({
    id: "5d1",
    yardId: 3,
    times: [
      "*",
      "*",
      "*",
      "*",
      "*",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "*",
      "*"
    ]
  });
  //fake account_role
  account_role1 = await AccountRole.create({
    accountId: 1,
    roleId: 3
  });
  account_role2 = await AccountRole.create({
    accountId: 2,
    roleId: 2
  });
  account_role3 = await AccountRole.create({
    accountId: 3,
    roleId: 2
  });
  account_role4 = await AccountRole.create({
    accountId: 4,
    roleId: 3
  });
  account_role5 = await AccountRole.create({
    accountId: 5,
    roleId: 2
  });
  //fake history
  history1 = await History.create({
    day: "2019-11-11",
    time_come: 7,
    time_leave: 9,
    price: 30000,
    slotId: "2a1",
    accountId: 4,
    yardId: 1
  });
  history2 = await History.create({
    day: "2019-11-12",
    time_come: 7,
    time_leave: 10,
    price: 45000,
    slotId: "2a1",
    accountId: 4,
    yardId: 1
  });
  history3 = await History.create({
    day: "2019-11-12",
    time_come: 14,
    time_leave: 15,
    price: 15000,
    slotId: "2a1",
    accountId: 4,
    yardId: 1
  });
  history4 = await History.create({
    day: "2019-11-12",
    time_come: 7,
    time_leave: 9,
    price: 15000,
    slotId: "2a2",
    accountId: 4,
    yardId: 1
  });
};

module.exports = {
  Account,
  Car,
  History,
  ParkingNow,
  TimeBooking,
  Yard,
  Slot,
  AccountRole,
  Role
};
