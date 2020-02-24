const pageNotFoundController = require('../controllers/page-not-found-controller')
const User = require('../models/user-model')

module.exports = (req, res, next) => {
    User.findById(req.session.user._id)
        .then(user => {
            req.session.user = user
            next()
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/page-not-found')
        })
}
