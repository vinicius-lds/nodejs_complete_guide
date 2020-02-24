const Product = require('../../models/product-model')

module.exports.renderAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

module.exports.postProduct = (req, res, next) => {
    new Product({ title: req.body.title, price: req.body.price, description: req.body.description, imageUrl: req.body.imageUrl, userId: req.user })
        .save()
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.error(err)
            res.redirect('/page-not-found')
        })
}
