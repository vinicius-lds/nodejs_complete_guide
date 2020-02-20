const ProductModel = require('../../models/product-model')

module.exports.renderProductsPage = (req, res, next) => {
    ProductModel.findAll().then(products => {
        res.render('admin/products', {
            pageTitle: 'Products',
            path: '/admin/products',
            prods: products
        })
    }).catch(console.err)
}
