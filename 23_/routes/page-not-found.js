const express = require('express')

const pageNotFoundController = require('../controllers/page-not-found-controller')

const router = express.Router()
const path = '/'

router.use(path, pageNotFoundController.renderPageNotFoundPage)

module.exports.router = router
