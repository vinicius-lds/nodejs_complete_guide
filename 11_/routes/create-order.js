const express = require('express')

const createOrderController = require('../controllers/create-order-controller')

const router = express.Router()
const path = '/create-order'

router.post(path, createOrderController.createOrder)

module.exports.router = router
