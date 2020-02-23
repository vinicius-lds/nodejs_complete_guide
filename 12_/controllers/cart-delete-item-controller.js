const UserDao = require('../data/user-dao')


module.exports.deleteItem = (req, res, next) => {
    req.user.removeFromCartByProductId(req.body.productId)
    UserDao
        .saveCart(req.user)
        .then(() => {
            return res.redirect('/cart')
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/cart')
        })
}
