const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const accounts = require("../routes/account");
const owners = require("../routes/owners");
const customers = require("../routes/customers");
const admins = require("../routes/admins");
const error = require("../middlewares/errors");

module.exports = app => {
  app.use(fileUpload({ createParentPath: true }));
  app.use(cors({ origin: "*", credentials: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.use("/api/accounts", accounts);
  app.use("/api/owners", owners);
  app.use("/api/customers", customers);
  app.use("api/admins", admins);

  app.use(error);
};
