module.exports = (sequelize, type) => {
  return sequelize.define("yard", {
    yardId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    acreage: {
      type: type.INTEGER,
      allowNull: false
    },
    point: {
      type: type.INTEGER,
      allowNull: false
    },
    status: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    address: {
      type: type.STRING,
      allowNull: false
    },
    latitude: {
      type: type.DOUBLE,
      allowNull: false
    },
    longitude: {
      type: type.DOUBLE,
      allowNull: false
    }
  });
};
