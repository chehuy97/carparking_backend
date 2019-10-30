module.exports = (sequelize, type) => {
  {
    return sequelize.define("parking_now", {
      time_come: {
        type: type.DATE,
        allowNull: false
      },
      total_time: {
        type: type.FLOAT,
        allowNull: false
      },
      price: {
        type: type.FLOAT,
        allowNull: false
      }
    });
  }
};
