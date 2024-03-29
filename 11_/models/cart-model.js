const { connection, Sequelize } = require('../db')

module.exports = connection.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, {
    underscored: true
})

