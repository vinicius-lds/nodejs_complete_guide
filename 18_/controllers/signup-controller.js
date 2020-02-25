const bcrypt = require('bcryptjs')
const mailing = require('../mailing')
const User = require('../models/user-model')

module.exports.renderSignupPage = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Index',
        path: '/singup',
        errorMessage: undefined,
        validationErrors: [],
        oldInput: {}
    })
}

module.exports.postSignup = (req, res, next) => {
    const { email, password } = req.body
    const fetchedData = {}

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({ name: email, email: email, password: hashedPassword, cart: { items: [] } })
            fetchedData.user = user
            return user.save() 
        })
        .then(() => {
            res.redirect('/login')
            return mailing.sendMail({
                to: fetchedData.user.email,
                subject: 'Signup Succeeded',
                html: '<h1>You successfuly signed up!</h1>'
            })
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/signup')
        })
}
