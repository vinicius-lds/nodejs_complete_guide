const express = require('express')

const ordersController = require('../controllers/orders-controller')

const router = express.Router()
const path = '/orders'

router.get(path, ordersController.renderOrdersPage)

module.exports.router = router
