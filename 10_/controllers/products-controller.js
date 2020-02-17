const productDao = require('../data/product-dao')

module.exports.renderProductsPage = (req, res, next) => {
    productDao.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                pageTitle: 'All Products',
                path: '/products',
                prods: products
            })
        })
}
