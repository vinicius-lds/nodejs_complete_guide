const express = require('express')

const deleteProductController = require('../../controllers/admin/delete-product-controller')

const router = express.Router()
const path = '/delete-product'

router.post(path, deleteProductController.deleteProduct)

module.exports.router = router

