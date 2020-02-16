const product = require('../data/product')

module.exports.renderProductsPage = (req, res, next) => {
    product.fetchAll(products => {
        res.render('shop/product-list', {
            pageTitle: 'All Products',
            path: '/products',
            prods: products
        })
    })
}
