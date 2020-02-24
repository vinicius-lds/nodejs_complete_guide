const pageNotFoundController = require('../controllers/page-not-found-controller')
const User = require('../models/user-model')

module.exports = (req, res, next) => {
    User.find({ name: 'Vinicius' })
        .then(users => {
            if (!users || !users.length) {
                const user = new User({
                    name: 'Vinicius',
                    email: 'vini_gatao@hotmail.com',
                    cart: {
                        items: []
                    }
                })
                req.user = user
                return user.save()
            } else {
                req.user = users[0]
                return Promise.resolve(() => {})
            }
        })
        .then(user => {
            next()
        })
        .catch(err => {
            console.error(err)
            pageNotFoundController.renderPageNotFoundPage()
        })
}
