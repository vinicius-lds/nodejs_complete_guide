const path = require('path')

const basePath = path.join(__dirname, 'views')

exports.main = path.join(basePath, 'main.htm')
exports.adminAddProduct = path.join(basePath, 'admin', 'add-product.htm')
exports.pageNotFound = path.join(basePath, 'page-not-found.htm')

