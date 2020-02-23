const ProductDao = require('../../data/product-dao')

module.exports.renderProductsPage = (req, res, next) => {
    ProductDao
        .fetchAll()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Products',
                path: '/admin/products',
                prods: products
            })
        })
        .catch(console.err)
}
