module.exports = (sequelize, type) => {
  {
    return sequelize.define("yard_schedule", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      day: {
        type: type.STRING,
        allowNull: false
      },
      time_open: {
        type: type.INTEGER,
        allowNull: false
      },
      time_close: {
        type: type.INTEGER,
        allowNull: false
      },
      status: {
        type: type.BOOLEAN,
        allowNull: false
      }
    });
  }
};
