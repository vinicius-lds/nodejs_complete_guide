const express = require('express')

const editProductController = require('../../controllers/admin/edit-product-controller')

const router = express.Router()
const path = '/edit-product'

router.get(`${path}/:id`, editProductController.renderEditProductPage)
router.post(path, editProductController.postProduct)

module.exports.router = router

