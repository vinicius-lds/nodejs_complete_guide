const Product = require('../models/product-model')

module.exports.renderProductsPage = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                pageTitle: 'Index',
                path: '/products',
                prods: products,
                isAuthenticated: req.session.isLoggedIn,
            })
    }).catch(err => {
        console.err(err)
    })
}
