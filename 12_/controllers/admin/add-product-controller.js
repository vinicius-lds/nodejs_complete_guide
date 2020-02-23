const Product = require('../../models/product-model')
const ProductDao = require('../../data/product-dao')

module.exports.renderAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

module.exports.postProduct = (req, res, next) => {
    ProductDao
        .save(Product.from({ userId: req.user._id, ...req.body}))
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.error(err)
            res.redirect('/page-not-found')
        })
}
