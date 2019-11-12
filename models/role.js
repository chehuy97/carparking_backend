module.exports = (sequelize, type) => {
  return sequelize.define("role", {
    id: {
      type: type.INTEGER,
      primaryKey: true
    },
    role_name: {
      type: type.STRING,
      allowNull: false
    }
  });
};
