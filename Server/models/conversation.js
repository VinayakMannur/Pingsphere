const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Conversation = sequelize.define("conversation", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
})

module.exports = Conversation;