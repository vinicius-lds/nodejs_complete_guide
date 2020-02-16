const product = require('../../data/product')

module.exports.renderProductsPage = (req, res, next) => {
    product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: 'Products',
            path: '/admin/products',
            prods: products
        })
    })
}
