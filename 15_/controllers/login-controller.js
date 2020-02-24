const bcrypt = require('bcryptjs')
const User = require('../models/user-model')

module.exports.renderLoginPage = (req, res, next) => {
    const flashMessages = req.flash('error')
    return res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: flashMessages && flashMessages.length ? flashMessages : undefined,
    })
}

module.exports.postLogin = (req, res, next) => {
    const { email, password } = req.body
    const fetchedData = {}
    
    User.findOne({ email: email })
        .then(user => {
            fetchedData.user = user
            if (user) {
                return bcrypt.compare(password, user.password)
            } else {
                req.flash('error', 'Invalid e-mail')
                return res.redirect('/login')
            }
        })
        .then(result => {
            if (result) {
                req.session.user = fetchedData.user
                req.session.isLoggedIn = true
                return req.session.save(() => res.redirect('/'))
            } else {
                req.flash('error', 'Invalid password')
                return res.redirect('/login')
            }
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/page-not-found')
        })
}
