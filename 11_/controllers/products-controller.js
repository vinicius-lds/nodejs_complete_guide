const ProductModel = require('../models/product-model')

module.exports.renderProductsPage = (req, res, next) => {
    ProductModel.findAll().then(products => {
        res.render('shop/index', {
            pageTitle: 'Index',
            path: '/',
            prods: products
        })
    }).catch(console.err)
}