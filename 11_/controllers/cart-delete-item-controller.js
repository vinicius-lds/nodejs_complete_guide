const cartItem = require('../models/cart-item-model')

module.exports.deleteItem = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cartItem.destroy({ where: { cartId: cart.id, productId: req.body.productId } })
        })
        .then(() => {
            return res.redirect('/cart')
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/cart')
        })
}
