const pageNotFoundController = require('../page-not-found-controller')
const ProductModel = require('../../models/product-model')


module.exports.renderEditProductPage = (req, res, next) => {
    ProductModel.findByPk(req.params.id)
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
    ProductModel.findByPk(req.body.productId)
        .then(product => {
            product.title = req.body.title
            product.imageUrl = req.body.imageUrl
            product.description = req.body.description
            product.price = req.body.price
            return product.save()
        })
        .then(r => {
            console.log(r)
            res.redirect('/admin/products')
        })
        .catch(e => {
            console.error(e)
            res.redirect('/admin/products')
        })
}
