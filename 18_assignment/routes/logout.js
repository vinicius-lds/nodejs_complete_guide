const express = require('express')

const logoutController = require('../controllers/logout-controller')

const router = express.Router()
const path = '/logout'

router.post(path, logoutController.postLogout)

module.exports.router = router
