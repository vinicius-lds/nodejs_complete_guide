const cart = require('../data/cart')
const product = require('../data/product')

module.exports.deleteItem = (req, res, next) => {
    cart.deleteItemsByProductId(req.body.productId)
    res.redirect('/cart')
}
