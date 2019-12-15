module.exports = (sequelize, type) => {
  {
    return sequelize.define("history", {
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
      slotId: {
        type: type.STRING,
        allowNull: false
      },
      car_number: {
        type: type.STRING,
        allowNull: false
      }
    });
  }
};
