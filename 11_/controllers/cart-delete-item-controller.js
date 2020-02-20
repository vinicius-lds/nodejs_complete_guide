const cart = require('../data/cart')

module.exports.deleteItem = (req, res, next) => {
    cart.deleteItemsByProductId(req.body.productId)
    res.redirect('/cart')
}
