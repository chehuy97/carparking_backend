module.exports = (sequelize, type) => {
  return sequelize.define("account", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      allowNull: false
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    status: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    name: {
      type: type.STRING,
      allowNull: true
    },
    birthday: {
      type: type.DATEONLY,
      allowNull: true
    },
    gender: {
      type: type.ENUM("Male", "Female"),
      allowNull: true
    },
    phone: {
      type: type.STRING,
      allowNull: true
    },
    image: {
      type: type.STRING,
      allowNull: true,
      defaultValue: "sssdkashdgsakhdksahdas"
    },
    balance: {
      type: type.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  });
};
