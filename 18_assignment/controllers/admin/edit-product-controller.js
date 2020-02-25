const pageNotFoundController = require('../page-not-found-controller')
const Product = require('../../models/product-model')


module.exports.renderEditProductPage = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: true,
                product: product,
            })
        }).catch(() => pageNotFoundController.renderPageNotFoundPage(req, res, next))
    
}

module.exports.postProduct = (req, res, next) => {
    Product
        .findById(req.body.productId)
        .then(product => {
            product.title = req.body.title
            product.description = req.body.description
            product.price = req.body.price
            product.imageUrl = req.body.imageUrl
            return product.save()
        })
        .then(() => {
            return res.redirect('/admin/products')
        })
        .catch(e => {
            console.error(e)
            return res.redirect('/admin/products')
        })
}
