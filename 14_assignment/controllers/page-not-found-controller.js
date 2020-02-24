module.exports.renderPageNotFoundPage = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found!',
        path: undefined,
        isAuthenticated: req.session.isLoggedIn,
    })
}
