const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const GroupMember = sequelize.define('groupmember',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
})

module.exports = GroupMember