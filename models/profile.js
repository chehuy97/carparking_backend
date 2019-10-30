module.exports = (sequelize, type) => {
  return sequelize.define("profile", {
    name: {
      type: type.STRING,
      allowNull: true
    },
    birthday: {
      type: type.DATEONLY,
      allowNull: true
    },
    sex: {
      type: type.BOOLEAN,
      allowNull: true
    },
    phone: {
      type: type.STRING,
      allowNull: true
    },
    image: {
      type: type.STRING,
      allowNull: true
    },
    balance: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
};
