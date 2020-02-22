const pageNotFoundController = require('../controllers/page-not-found-controller')
const User = require('../models/user-model')

module.exports = (req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            console.error(err)
            pageNotFoundController.renderPageNotFoundPage()            
        })
}
