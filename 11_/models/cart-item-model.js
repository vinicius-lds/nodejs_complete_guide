const { connection, Sequelize } = require('../db')

module.exports = connection.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
}, {
    underscored: true
})

