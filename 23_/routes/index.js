const express = require('express')

const indexController = require('../controllers/index-controller')

const router = express.Router()
const path = '/'

router.get(path, indexController.renderIndexPage)

module.exports.router = router
