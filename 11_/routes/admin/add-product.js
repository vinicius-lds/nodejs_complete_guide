const express = require('express')

const addProductController = require('../../controllers/admin/add-product-controller')

const router = express.Router()
const path = '/add-product'

router.get(path, addProductController.renderAddProductPage)
router.post(path, addProductController.postProduct)

module.exports.router = router

