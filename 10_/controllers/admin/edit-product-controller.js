const pageNotFoundController = require('../page-not-found-controller')
const productDao = require('../../data/product-dao')
const ProductModel = require('../../models/product-model')


module.exports.renderEditProductPage = (req, res, next) => {
    productDao.findById(req.params.id)
    .then(product => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true,
            product: product
        })
    }).catch(error => pageNotFoundController.renderPageNotFoundPage(req, res, next))
    
}

module.exports.postProduct = (req, res, next) => {
    productDao.update(ProductModel.of({ id: req.body.productId, ...req.body }))
    res.redirect('/admin/products')
}
