const pageNotFoundController = require('../controllers/page-not-found-controller')
const User = require('../models/user-model')
const UserDao = require('../data/user-dao')

module.exports = (req, res, next) => {
    UserDao
        .fetchAll()
        .then(users => {
            if (!users || !users.length) {
                return UserDao.save(new User(undefined, 'vini_gatao', 'vini_gatao@hotmail.com'))
            } else {
                return users[0]
            }
        })
        .then(user => {
            req.user = User.from(user)
            next()
        })
        .catch(err => {
            console.error(err)
            pageNotFoundController.renderPageNotFoundPage(req, res, next)
        })
}
