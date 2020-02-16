const product = require('../data/product')
const pageNotFoundController = require('./page-not-found-controller')

module.exports.renderProductPage = (req, res, next) => {
    const { id } = req.params
    product.findById(
        id,
        productModel => {
            res.render('shop/product-detail', {
                pageTitle: productModel.title,
                path: '/products',
                product: productModel
            })
        },
        () => pageNotFoundController.renderPageNotFoundPage(req, res, next)        
    )
}
