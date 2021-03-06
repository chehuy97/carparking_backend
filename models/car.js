module.exports = (sequelize, type) => {
  {
    return sequelize.define("car", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      color: {
        type: type.STRING,
        allowNull: false
      },
      brand: {
        type: type.STRING,
        allowNull: false
      },
      car_type: {
        type: type.STRING,
        allowNull: false
      },
      // point: {
      //   type: type.INTEGER,
      //   allowNull: false
      // },
      car_number: {
        type: type.STRING,
        allowNull: false
      }
    });
  }
};
