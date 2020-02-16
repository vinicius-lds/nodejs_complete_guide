const express = require('express')

const htmlPaths = require('../html-paths')

const router = express.Router()
const path = '/'

router.use(path, (req, res, next) => {
    // res.status(404).sendFile(htmlPaths.pageNotFound)
    res.status(404).render('page-not-found', {
        pageTitle: 'Page Not Found!',
        path: undefined
    })
})

exports.router = router
