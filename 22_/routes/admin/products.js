const express = require('express')

const productsController = require('../../controllers/admin/products-controller')
const userAuthenticationMiddleware = require('../../middleware/user-authentication-middleware')

const router = express.Router()
const path = '/products'

router.get(path, userAuthenticationMiddleware, productsController.renderProductsPage)

module.exports.router = router
