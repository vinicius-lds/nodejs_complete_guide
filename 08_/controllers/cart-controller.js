
module.exports.renderCartPage = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: 'shop/cart'
    })
}
