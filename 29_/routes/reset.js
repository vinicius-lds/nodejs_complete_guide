const express = require('express')

const resetController = require('../controllers/reset-controller')

const router = express.Router()
const path = '/reset'

router.get(path, resetController.renderResetPage)
router.get(`${path}/:token`, resetController.renderNewPasswordPage)
router.post(path, resetController.postReset)

module.exports.router = router
