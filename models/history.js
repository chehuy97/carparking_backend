module.exports = (sequelize, type) => {
  {
    return sequelize.define("history", {
      time_come: {
        type: type.DATE,
        allowNull: false
      },
      time_leave: {
        type: type.DATE,
        allowNull: false
      },
      price: {
        type: type.FLOAT,
        allowNull: false
      }
    });
  }
};
