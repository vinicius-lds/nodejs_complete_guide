const { Sequelize } = require('sequelize')

module.exports = {
    connection: new Sequelize('node-complete', 'root', '', { dialect: 'mysql', host: 'localhost' }),
    Sequelize: Sequelize,
    setup() {
        const Cart = require('./models/cart-model')
        const CartItem = require('./models/cart-item-model')
        const Product = require('./models/product-model')
        const Order = require('./models/order-model')
        const OrderItem = require('./models/order-item-model')
        const User = require('./models/user-model')
        
        Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
        User.hasMany(Product)
        
        User.hasOne(Cart)
        Cart.belongsTo(User)

        Cart.belongsToMany(Product, { through: CartItem })
        Product.belongsToMany(Cart, { through: CartItem })

        Order.belongsTo(User);
        User.hasMany(Order);
        Order.belongsToMany(Product, { through: OrderItem });

        this.connection
            .sync({ force: false })
            .then(r => {
                return User.findByPk(1)
            })
            .then(user => {
                return user ? user : User.create({ name: 'Vinicius', email: 'vini_gatao@hotmail.com' })
            })
            .then(user => {
                return user.createCart()
            })
            .catch(console.error)
    }
}
