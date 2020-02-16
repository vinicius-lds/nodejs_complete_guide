const express = require('express')

const mainController = require('../controllers/main-controller')

const router = express.Router()
const path = '/'

router.get(path, mainController.renderMainPage)

module.exports.router = router
