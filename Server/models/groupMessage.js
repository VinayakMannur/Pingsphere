const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const GroupMessage = sequelize.define('groupmessage',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Image: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    Document: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
})

module.exports = GroupMessage