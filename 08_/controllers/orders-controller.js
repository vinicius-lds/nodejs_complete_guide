
module.exports.renderOrdersPage = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: 'shop/orders'
    })
}
