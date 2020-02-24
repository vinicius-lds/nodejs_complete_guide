const Order = require('../models/order-model')


module.exports.createOrder = (req, res, next) => {
    console.log('aqui fuuuck')
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const order = new Order({
                user: {
                    name: user.name,
                    userId: user
                },
                products: user.cart.items.map(item => {
                    return { quantity: item.quantity, productData: { ...item.productId._doc } }
                })
            })
            return order.save()
        })
        .then(() => {
            return req.user.clearCart()
        })
        .then(() => {
            return res.redirect('/orders')
        })
        .catch(err => {
            console.error(err)
            res.redirect('/page-not-found')
        })
}
