const Product = require('../models/product-model')


module.exports.renderIndexPage = (req, res, next) => {
    Product.find().then(products => {
        res.render('shop/index', {
            pageTitle: 'Index',
            path: '/',
            prods: products
        })
    }).catch(console.err)
}
