const ProductDao = require('../data/product-dao')
const OrderDao = require('../data/order-dao')
const UserDao = require('../data/user-dao')

module.exports.createOrder = (req, res, next) => {
    ProductDao
        .fetchCartProducts(req.user.getCart())
        .then(products => {
            const order = req.user.makeOrder(products)
            return OrderDao.save(order)
        })
        .then(() => {
            return UserDao.saveCart(req.user)
        })
        .then(() => {
            return res.redirect('/orders')
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/cart')
        })
    
}
