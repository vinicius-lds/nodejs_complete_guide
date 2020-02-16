const path = require('path')

const product = require('../../data/product')
const ProductModel = require('../../models/product-model')


module.exports.renderAddProductPage = (req, res, next) => {
    res.render('admin/add-product',{
        pageTitle: 'Add Product',
        path: `/admin${path}`
    })
}

module.exports.postProduct = (req, res, next) => {
    product.save(
        new ProductModel(
            req.body.title,
            req.body.imageUrl,
            req.body.price,
            req.body.description
        )
    )
    res.redirect('/')
}
