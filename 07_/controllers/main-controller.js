const path = require('path')

const product = require('../data/product')


module.exports.renderMainPage = (req, res, next) => {
    product.fetchAll(products => {
        res.render('main', {
            pageTitle: 'Shop',
            path: path,
            products: products
        })
    })
}
