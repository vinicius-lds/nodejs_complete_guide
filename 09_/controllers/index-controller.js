const product = require('../data/product')


module.exports.renderIndexPage = (req, res, next) => {
    product.fetchAll(products => {
        res.render('shop/index', {
            pageTitle: 'Index',
            path: '/',
            prods: products
        })
    })
}
