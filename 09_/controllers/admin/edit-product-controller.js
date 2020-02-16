const pageNotFoundController = require('../page-not-found-controller')
const product = require('../../data/product')
const ProductModel = require('../../models/product-model')


module.exports.renderEditProductPage = (req, res, next) => {
    product.findById(req.params.id, product => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true,
            product: product
        })
    }, () => pageNotFoundController.renderPageNotFoundPage(req, res, next))
    
}

module.exports.postProduct = (req, res, next) => {
    console.log(req.body)
    product.update(ProductModel.of({ id: req.body.productId, ...req.body }))
    res.redirect('/admin/products')
}
