const Product = require('../../models/product-model')

module.exports.renderProductsPage = (req, res, next) => {
    req.user.getProducts().then(products => {
        res.render('admin/products', {
            pageTitle: 'Products',
            path: '/admin/products',
            prods: products
        })
    }).catch(console.err)
}
