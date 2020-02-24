const User = require('../models/user-model')

module.exports.renderLoginPage = (req, res, next) => {
    return res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
    })
}

module.exports.postLogin = (req, res, next) => {
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
                req.session.user = user
                return user.save()
            } else {
                req.session.user = users[0]
                return Promise.resolve(() => {})
            }
        })
        .then(() => {
            req.session.isLoggedIn = true
            return req.sessin.save(() => {
                return res.redirect('/')
            })
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/page-not-found')
        })
}
