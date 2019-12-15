const Sequelize = require("sequelize");
const { logger } = require("../middlewares/logging");

const AccountModel = require("../models/account");
//const ProfileModel = require("../models/profile");
const RoleModel = require("../models/role");
const CarModel = require("../models/car");
const YardModel = require("../models/yard");
const HistoryModel = require("../models/history");
const TransactionModel = require("../models/transaction");
const YardScheduleModel = require("../models/yard_schedule");
const ReportModel = require("../models/report");

var dbConfig = {
  username: "root",
  password: "",
  database: "carparking_db",
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
const Transaction = TransactionModel(db, Sequelize);
const YardSchedule = YardScheduleModel(db, Sequelize);
const Report = ReportModel(db, Sequelize);

Account.belongsToMany(Role, { through: AccountRole });
Role.belongsToMany(Account, { through: AccountRole });

// Profile.belongsTo(Account);
// Account.hasOne(Profile);

Car.belongsTo(Account);
Account.hasMany(Car);

Yard.belongsTo(Account);
Account.hasOne(Yard);

Transaction.belongsTo(Account);
Account.hasMany(Transaction);

Transaction.belongsTo(Yard);
Yard.hasMany(Transaction);

History.belongsTo(Account);
Account.hasMany(History);

History.belongsTo(Yard);
Yard.hasMany(History);

YardSchedule.belongsTo(Yard);
Yard.hasMany(YardSchedule);

Report.belongsTo(Transaction);
Transaction.hasMany(Report);

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
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQl3uHsV2FlWq8Nn0VN4iwVQJdBk2OOIpzbxzhZeP0_3NtB3hsc",
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
  account6 = await Account.create({
    username: "arthur07",
    password: "123456",
    name: "Arturia Pendragon",
    birthday: "1996-01-02",
    gender: "Female",
    phone: "0922123865",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 10000
  });
  account7 = await Account.create({
    username: "account01",
    password: "123456",
    name: "Ngo Xuong",
    birthday: "1996-01-02",
    gender: "Female",
    phone: "0922123865",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 10000
  });
  account8 = await Account.create({
    username: "account02",
    password: "123456",
    name: "Ho Nam Duong",
    birthday: "1996-01-02",
    gender: "Female",
    phone: "0922123865",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 10000
  });
  account9 = await Account.create({
    username: "account03",
    password: "123456",
    name: "Le Toan",
    birthday: "1996-01-02",
    gender: "Female",
    phone: "0922123865",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 10000
  });
  account10 = await Account.create({
    username: "account04",
    password: "123456",
    name: "Tran Trung Kien",
    birthday: "1996-01-02",
    gender: "Female",
    phone: "0922123865",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 10000
  });
  account11 = await Account.create({
    username: "account05",
    password: "123456",
    name: "Do Duc Viet",
    birthday: "1996-01-02",
    gender: "Female",
    phone: "0922123865",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 10000
  });
  account12 = await Account.create({
    username: "account06",
    password: "123456",
    name: "Nguyen Thi Anh",
    birthday: "1996-01-02",
    gender: "Female",
    phone: "0922123865",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 10000
  });
  account13 = await Account.create({
    username: "account07",
    password: "123456",
    name: "Che Van Thai",
    birthday: "1961-06-20",
    gender: "Male",
    phone: "0935430098",
    image:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/1/1f/Boy-cute-my-love-nice-Favim.com-2847742.jpg/revision/latest?cb=20170728233309",
    balance: 10000
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
    car_type: "3-4",
    // point: "3",
    car_number: "HR26DK8337",
    accountId: 1
  });
  car2 = await Car.create({
    color: "black",
    brand: "hyundai",
    car_type: "3-4",
    // point: "3",
    car_number: "HT26VB1986",
    accountId: 4
  });
  car3 = await Car.create({
    color: "red",
    brand: "hyundai",
    car_type: "3-4",
    // point: "3",
    car_number: "VK96DE9864",
    accountId: 1
  });
  //fake yard
  yard1 = await Yard.create({
    status: 1,
    address: "362 Dong Da",
    image_yard: "http://dananghouse.com.vn/wp-content/uploads/IMAG0074.jpg",
    latitude: 16.074309,
    longitude: 108.21422,
    time_open: 6,
    time_close: 20,
    price: 15000,
    slot: 2,
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
    ],
    accountId: 2
  });
  yard2 = await Yard.create({
    status: 1,
    address: "74 Chi Lang",
    image_yard:
      "https://media-cdn.tripadvisor.com/media/photo-s/10/38/75/c5/karma-waters-restaurant.jpg",
    latitude: 16.068639,
    longitude: 108.21545,
    time_open: 6,
    time_close: 20,
    price: 20000,
    slot: 1,
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
    ],
    accountId: 3
  });
  yard3 = await Yard.create({
    status: 1,
    address: "86 Duy Tan",
    image_yard:
      "https://cloud.muaban.net/images/thumb-detail/2019/09/21/312/db11c30d6e9349e39c4ed395f0aabc37.jpg",
    latitude: 16.04908,
    longitude: 108.211905,
    time_open: 5,
    time_close: 22,
    price: 20000,
    slot: 1,
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
    ],
    accountId: 5
  });
  yard4 = await Yard.create({
    status: 1,
    address: "935 Nguyen Tat Thanh",
    image_yard:
      "https://cloud.muaban.net/images/thumb-detail/2019/09/21/312/db11c30d6e9349e39c4ed395f0aabc37.jpg",
    latitude: 16.072281,
    longitude: 108.191504,
    time_open: 5,
    time_close: 22,
    price: 20000,
    slot: 1,
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
    ],
    accountId: 7
  });
  yard5 = await Yard.create({
    status: 1,
    address: "391 Ton Duc Thang",
    image_yard:
      "https://cloud.muaban.net/images/thumb-detail/2019/09/21/312/db11c30d6e9349e39c4ed395f0aabc37.jpg",
    latitude: 16.059599,
    longitude: 108.164615,
    time_open: 5,
    time_close: 22,
    price: 20000,
    slot: 1,
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
    ],
    accountId: 8
  });
  yard6 = await Yard.create({
    status: 1,
    address: "123 Hoang Dieu",
    image_yard:
      "https://cloud.muaban.net/images/thumb-detail/2019/09/21/312/db11c30d6e9349e39c4ed395f0aabc37.jpg",
    latitude: 16.062551,
    longitude: 108.217539,
    time_open: 5,
    time_close: 22,
    price: 20000,
    slot: 3,
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
    ],
    accountId: 9
  });
  yard7 = await Yard.create({
    status: 1,
    address: "183 Dong Da",
    image_yard:
      "https://cloud.muaban.net/images/thumb-detail/2019/09/21/312/db11c30d6e9349e39c4ed395f0aabc37.jpg",
    latitude: 16.077773,
    longitude: 108.216411,
    time_open: 5,
    time_close: 22,
    price: 20000,
    slot: 1,
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
    ],
    accountId: 10
  });
  yard8 = await Yard.create({
    status: 1,
    address: "20 Phan Van Dong",
    image_yard:
      "https://cloud.muaban.net/images/thumb-detail/2019/09/21/312/db11c30d6e9349e39c4ed395f0aabc37.jpg",
    latitude: 16.071679,
    longitude: 108.235225,
    time_open: 5,
    time_close: 22,
    price: 20000,
    slot: 4,
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
    ],
    accountId: 11
  });
  yard12 = await Yard.create({
    status: 1,
    address: "196 Nguyen Cong Tru",
    image_yard:
      "https://cloud.muaban.net/images/thumb-detail/2019/09/21/312/db11c30d6e9349e39c4ed395f0aabc37.jpg",
    latitude: 16.067159,
    longitude: 108.235134,
    time_open: 5,
    time_close: 22,
    price: 20000,
    slot: 1,
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
    ],
    accountId: 12
  });
  yard10 = await Yard.create({
    status: 1,
    address: "112/59 Tran Cao Van",
    image_yard:
      "https://cloud.muaban.net/images/thumb-detail/2019/09/21/312/db11c30d6e9349e39c4ed395f0aabc37.jpg",
    latitude: 16.074008,
    longitude: 108.208568,
    time_open: 5,
    time_close: 22,
    price: 20000,
    slot: 1,
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
    ],
    accountId: 13
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
  account_role6 = await AccountRole.create({
    accountId: 6,
    roleId: 1
  });
  account_role7 = await AccountRole.create({
    accountId: 7,
    roleId: 2
  });
  account_role8 = await AccountRole.create({
    accountId: 8,
    roleId: 2
  });
  account_role9 = await AccountRole.create({
    accountId: 9,
    roleId: 2
  });
  account_role10 = await AccountRole.create({
    accountId: 10,
    roleId: 2
  });
  account_role11 = await AccountRole.create({
    accountId: 11,
    roleId: 2
  });
  account_role12 = await AccountRole.create({
    accountId: 12,
    roleId: 2
  });
  account_role13 = await AccountRole.create({
    accountId: 13,
    roleId: 2
  });
  //fake transaction
  transaction1 = await Transaction.create({
    day: "2019-11-11",
    time_come: 7,
    time_leave: 9,
    price: 30000,
    car_number: "VK96DE9864",
    slot: 1,
    accountId: 1,
    yardId: 1
  });
  transaction2 = await Transaction.create({
    day: "2019-12-13",
    time_come: 8,
    time_leave: 10,
    price: 30000,
    car_number: "HT26VB1986",
    slot: 1,
    accountId: 4,
    yardId: 1
  });
  transaction3 = await Transaction.create({
    day: "2019-12-13",
    time_come: 8,
    time_leave: 11,
    price: 45000,
    car_number: "HT26VB1986",
    slot: 2,
    accountId: 1,
    yardId: 1
  });
  transaction4 = await Transaction.create({
    day: "2019-12-13",
    time_come: 13,
    time_leave: 15,
    price: 15000,
    car_number: "HT26VB1986",
    slot: 1,
    accountId: 4,
    yardId: 1
  });
  transaction5 = await Transaction.create({
    day: "2019-12-13",
    time_come: 16,
    time_leave: 17,
    price: 15000,
    car_number: "HT26VB1986",
    slot: 1,
    accountId: 4,
    yardId: 1
  });
  transaction6 = await Transaction.create({
    day: "2019-12-13",
    time_come: 16,
    time_leave: 17,
    slot: 2,
    price: 15000,
    car_number: "HT26VB1986",
    accountId: 4,
    yardId: 1
  });
  transaction7 = await Transaction.create({
    day: "2019-12-13",
    time_come: 8,
    time_leave: 12,
    price: 120000,
    car_number: "HT26VB1986",
    slot: 1,
    accountId: 4,
    yardId: 2
  });
  transaction8 = await Transaction.create({
    day: "2019-12-13",
    time_come: 15,
    time_leave: 16,
    price: 20000,
    car_number: "HT26VB1986",
    slot: 1,
    accountId: 1,
    yardId: 2
  });
  transaction9 = await Transaction.create({
    day: "2019-12-14",
    time_come: 11,
    time_leave: 13,
    price: 15000,
    car_number: "HT26VB1986",
    slot: 1,
    accountId: 4,
    yardId: 1
  });
  transaction10 = await Transaction.create({
    day: "2019-12-14",
    time_come: 11,
    time_leave: 13,
    price: 15000,
    car_number: "HT26VB1986",
    slot: 2,
    accountId: 1,
    yardId: 1
  });
  transaction11 = await Transaction.create({
    day: "2019-12-15",
    time_come: 9,
    time_leave: 10,
    price: 15000,
    car_number: "HT26VB1986",
    slot: 1,
    accountId: 4,
    yardId: 1
  });
  transaction12 = await Transaction.create({
    day: "2019-12-15",
    time_come: 9,
    time_leave: 10,
    price: 15000,
    car_number: "HT26VB1986",
    slot: 2,
    accountId: 1,
    yardId: 1
  });
  transaction13 = await Transaction.create({
    day: "2019-12-16",
    time_come: 14,
    time_leave: 17,
    price: 15000,
    car_number: "HT26VB1986",
    slot: 1,
    accountId: 4,
    yardId: 1
  });
  transaction14 = await Transaction.create({
    day: "2019-12-16",
    time_come: 14,
    time_leave: 18,
    price: 15000,
    car_number: "HT26VB1986",
    slot: 2,
    accountId: 1,
    yardId: 1
  });
  // transaction15 = await Transaction.create({
  //   day: "2019-12-1",
  //   time_come: 14,
  //   time_leave: 18,
  //   price: 15000,
  //   car_number: "HT26VB1986",
  //   accountId: 1,
  //   yardId: 3
  // });
  //yard_schedule
  yardSchedule1 = await YardSchedule.create({
    day: "2019-11-26",
    time_open: 7,
    time_close: 14,
    status: true,
    yardId: 1
  });
  yardSchedule2 = await YardSchedule.create({
    day: "2019-12-9",
    time_open: 0,
    time_close: 0,
    status: true,
    yardId: 1
  });
  /// fake report
  report1 = await Report.create({
    car_number: "JD556DDSDF",
    transactionId: 2
  });
};

module.exports = {
  Account,
  Car,
  History,
  Transaction,
  Yard,
  YardSchedule,
  AccountRole,
  Role,
  Report
};
