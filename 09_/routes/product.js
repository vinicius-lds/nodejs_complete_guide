const express = require('express')

const productController = require('../controllers/product-controller')

const router = express.Router()
const path = '/products'

router.get(`${path}/:id`, productController.renderProductPage)

module.exports.router = router
