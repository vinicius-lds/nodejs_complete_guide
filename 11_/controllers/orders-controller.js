module.exports.renderOrdersPage = (req, res, next) => {
    req.user.getOrders({ include: ['products'] })
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders: orders
            })
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/page-not-found')
        })
    
}
