const express = require('express')

const cartDeleteItemController = require('../controllers/cart-delete-item-controller')

const router = express.Router()
const path = '/cart-delete-item'

router.post(path, cartDeleteItemController.deleteItem)

module.exports.router = router
