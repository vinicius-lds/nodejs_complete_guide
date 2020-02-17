const productDao = require('../data/product-dao')
const pageNotFoundController = require('./page-not-found-controller')

module.exports.renderProductPage = (req, res, next) => {
    const { id } = req.params
    productDao.findById(id)
        .then(productModel => {
            res.render('shop/product-detail', {
                pageTitle: productModel.title,
                path: '/products',
                product: productModel
            })
        }).catch(error => pageNotFoundController.renderPageNotFoundPage(req, res, next))
}
