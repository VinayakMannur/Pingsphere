const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Participant = sequelize.define("participant", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userIds: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    conversationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
})

module.exports = Participant;