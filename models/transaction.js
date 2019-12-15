module.exports = (sequelize, type) => {
  {
    return sequelize.define("transaction", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      day: {
        type: type.STRING,
        allowNull: false
      },
      time_come: {
        type: type.INTEGER,
        allowNull: false
      },
      time_leave: {
        type: type.INTEGER,
        allowNull: false
      },
      price: {
        type: type.FLOAT,
        allowNull: false
      },
      car_number: {
        type: type.STRING,
        allowNull: false
      },
      slot: {
        type: type.INTEGER,
        allowNull: false
      }
    });
  }
};
