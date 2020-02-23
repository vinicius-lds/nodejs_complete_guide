const ProductDao = require('../data/product-dao')

module.exports.renderProductsPage = (req, res, next) => {
    ProductDao.fetchAll().then(products => {
        console.log('aqui')
        res.render('shop/index', {
            pageTitle: 'Index',
            path: '/products',
            prods: products
        })
    }).catch(console.err)
}
