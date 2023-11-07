const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  otp: {
    type: Sequelize.INTEGER,
  },
  otp_expiry_time: {
    type: Sequelize.DATE
  },
  socket_id: {
    type: Sequelize.STRING,
  },
  friends:{
    type: Sequelize.JSON
  },
  status:{
    type: Sequelize.ENUM,
    values: ['Online', 'Offline']
  }
});

module.exports = User;
