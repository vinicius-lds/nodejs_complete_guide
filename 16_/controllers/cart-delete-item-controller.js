
module.exports.deleteItem = (req, res, next) => {
    req.session.user
        .removeFromCartByProductId(req.body.productId)
        .then(() => {
            return res.redirect('/cart')
        })
        .catch(err => {
            console.error(err)
            return res.redirect('/cart')
        })
}
