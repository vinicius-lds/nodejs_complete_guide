const Product = require('../../models/product-model')

module.exports.renderProductsPage = (req, res, next) => {
    Product
        .find()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Products',
                path: '/admin/products',
                prods: products,
                isAuthenticated: req.session.isLoggedIn,
            })
        })
        .catch(console.err)
}
