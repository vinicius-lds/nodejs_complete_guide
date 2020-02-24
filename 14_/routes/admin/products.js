const express = require('express')

const productsController = require('../../controllers/admin/products-controller')

const router = express.Router()
const path = '/products'

router.get(path, productsController.renderProductsPage)

module.exports.router = router
