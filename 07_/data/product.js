const fileUtils = require('../utils/file-utils')

module.exports.save = product => fileUtils.readAndAppend('products.json', product)
module.exports.fetchAll = callback => fileUtils.read('products.json', callback)
