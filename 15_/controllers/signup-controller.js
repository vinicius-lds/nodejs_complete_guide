const bcrypt = require('bcryptjs')
const User = require('../models/user-model')

module.exports.renderSignupPage = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Index',
        path: '/singup',
        errorMessage: undefined
    })
}

module.exports.postSignup = (req, res, next) => {
    const { email, password, confirmPassword } = req.body

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.redirect('/signup')
                return user
            }
        })
        .then(user => {
            if (!user) {
                return bcrypt.hash(password, 12)
            }
        })
        .then(hashedPassword => {
            if (hashedPassword) {
                const user = new User({ name: email, email: email, password: hashedPassword, cart: { items: [] } })
                return user.save() 
            }
        })
        .then(result => {
            if (result) {
                return res.redirect('/login')
            }
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/signup')
        })
}
