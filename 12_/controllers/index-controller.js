const ProductDao = require('../data/product-dao')


module.exports.renderIndexPage = (req, res, next) => {
    ProductDao.fetchAll().then(products => {
        res.render('shop/index', {
            pageTitle: 'Index',
            path: '/',
            prods: products
        })
    }).catch(console.err)
}
