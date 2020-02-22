const { connection, Sequelize } = require('../db')

module.exports = connection.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, {
    underscored: true
})

