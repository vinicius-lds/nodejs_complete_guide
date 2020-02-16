const product = require('../data/product')

module.exports.renderProductsPage = (req, res, next) => {
    product.fetchAll(products => {
        res.render('shop/product-list', {
            pageTitle: 'Shop',
            path: 'shop/product-list',
            products: products
        })
    })
}
