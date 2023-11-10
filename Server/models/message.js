const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Message = sequelize.define("message", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
})

module.exports = Message;