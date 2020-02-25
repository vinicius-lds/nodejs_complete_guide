const express = require('express')

const createOrderController = require('../controllers/create-order-controller')
const userAuthenticationMiddleware = require('../middleware/user-authentication-middleware')

const router = express.Router()
const path = '/create-order'

router.post(path, userAuthenticationMiddleware, createOrderController.createOrder)

module.exports.router = router
