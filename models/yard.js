module.exports = (sequelize, type) => {
  return sequelize.define("yard", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    acreage: {
      type: type.INTEGER,
      allowNull: false
    },
    // point: {
    //   type: type.INTEGER,
    //   allowNull: false
    // },
    status: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    address: {
      type: type.STRING,
      allowNull: false
    },
    image_yard: {
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
    },
    time_open: {
      type: type.INTEGER,
      allowNull: false
    },
    time_close: {
      type: type.INTEGER,
      allowNull: false
    },
    price: {
      type: type.INTEGER,
      allowNull: false
    }
  });
};
