const Product = require('../models/product-model')

module.exports.renderProductsPage = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/index', {
            pageTitle: 'Index',
            path: '/',
            prods: products
        })
    }).catch(console.err)
}
