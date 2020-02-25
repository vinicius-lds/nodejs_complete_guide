const { body, validationResult } = require('express-validator/check')
const User = require('../models/user-model')


const postValidation = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(422).render('auth/signup', {
            pageTitle: 'Index',
            path: '/singup',
            errorMessage: validationResult(req).array().map(value => value.msg).join(', '),
            validationErrors: validationResult(req).array(),
            oldInput: req.body
        })
    } else {
        return next() 
    }
}

module.exports = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('email').custom(email => User.findOne({ email: email }).then(user => user ? Promise.reject() : undefined)).withMessage('Email already registered'),
    body('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters'),
    body('confirmPassword').custom((value, {req}) => req.body.password === value).withMessage('Passwords do not match'),
    postValidation,
]
