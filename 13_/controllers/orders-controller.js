const Order = require('../models/order-model')


module.exports.renderOrdersPage = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            return res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders: orders
            })
        })
        .catch(err => {
            console.error(err)
            res.redirect('/page-not-found')
        })
}
