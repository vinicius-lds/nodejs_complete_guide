const OrderDao = require('../data/order-dao')


module.exports.renderOrdersPage = (req, res, next) => {
    OrderDao
        .findByUserId(req.user.getId())    
        .then(orders => {
            console.log(orders)
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
