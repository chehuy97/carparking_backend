module.exports = (sequelize, type) => {
  {
    return sequelize.define("time_booking", {
      time_waiting: {
        type: type.DATE,
        allowNull: false
      }
    });
  }
};
