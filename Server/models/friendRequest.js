const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const FriendRequest = sequelize.define("friendRequest", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  sender: {
    type: Sequelize.INTEGER,
  },
  recipient: {
    type: Sequelize.INTEGER,    
  },
});

module.exports = FriendRequest;
