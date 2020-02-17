const productDao = require('../../data/product-dao')

module.exports.renderProductsPage = (req, res, next) => {
    productDao.fetchAll()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Products',
                path: '/admin/products',
                prods: products
            })
        })
}
