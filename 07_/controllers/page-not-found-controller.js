module.exports.renderPageNotFoundPage = (req, res, next) => {
    res.status(404).render('page-not-found', {
        pageTitle: 'Page Not Found!',
        path: undefined
    })
}
