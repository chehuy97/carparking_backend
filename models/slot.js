module.exports = (sequelize, type) => {
  return sequelize.define("slot", {
    id: {
      type: type.STRING,
      primaryKey: true
    },
    times: {
      type: type.STRING,
      allowNull: true,
      get() {
        return this.getDataValue("times").split(",");
      },
      set(value) {
        this.setDataValue("times", value.join(","));
      }
    }
  });
};
