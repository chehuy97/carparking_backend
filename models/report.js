module.exports = (sequelize, type) => {
  {
    return sequelize.define("report", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      car_number: {
        type: type.STRING,
        allowNull: false
      }
    });
  }
};
