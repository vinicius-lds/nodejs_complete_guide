const express = require('express')

const htmlPaths = require('../html-paths')

const router = express.Router()
const path = '/'

router.get(path, (req, res, next) => res.sendFile(htmlPaths.main))

exports.router = router


