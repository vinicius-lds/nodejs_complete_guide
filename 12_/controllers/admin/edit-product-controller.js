const pageNotFoundController = require('../page-not-found-controller')
const Product = require('../../models/product-model')
const ProductDao = require('../../data/product-dao')


module.exports.renderEditProductPage = (req, res, next) => {
    ProductDao.findById(req.params.id)
        .then(product => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: true,
                product: product
            })
        }).catch(() => pageNotFoundController.renderPageNotFoundPage(req, res, next))
    
}

module.exports.postProduct = (req, res, next) => {
    ProductDao
        .save(Product.from({ id: req.body.productId, ...req.body }))
        .then(r => {
            console.log(r)
            res.redirect('/admin/products')
        })
        .catch(e => {
            console.error(e)
            res.redirect('/admin/products')
        })
}
