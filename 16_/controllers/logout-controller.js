module.exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err)
        }
        return res.redirect('/')
    })
}
