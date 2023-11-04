const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const ResetPassword = sequelize.define("resetpassword", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  passwordChangedAt: {
    type: Sequelize.DATE,
  },
  passwordResetToken: {
    type: Sequelize.STRING,
  },
  passwordResetExpires: {
    type: Sequelize.DATE,
  }
});

module.exports = ResetPassword;
