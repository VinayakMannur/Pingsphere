const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const FriendRequest = sequelize.define("friendRequest", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }
});

module.exports = FriendRequest;
