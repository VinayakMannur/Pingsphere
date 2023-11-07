const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const OneToOneMessage = sequelize.define("onetoonemessage",{
    participant1: {
        type: Sequelize.INTEGER,
    },
    participant2: {
        type: Sequelize.INTEGER,
    },
    message_to: {
        type: Sequelize.INTEGER,
    },
    message_from: {
        type: Sequelize.INTEGER,
    },
    text: {
        type: Sequelize.STRING,
    }
})

module.exports = OneToOneMessage;