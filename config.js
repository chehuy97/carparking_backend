require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST,
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
  TOKEN_LIFE: process.env.TOKEN_LIFE
};
