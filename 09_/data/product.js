const ProductModel = require('../models/product-model')
const fileUtils = require('../utils/file-utils')

module.exports.deleteById = id => {
    fileUtils.read('products.json', products => fileUtils.write('products.json', products.filter(product => product.id !== id)))
}

module.exports.fetchAll = callback => fileUtils.read('products.json', rawData => callback(rawData.map(ProductModel.of)))

module.exports.findBulkById = (productIds, callback) => {
    this.fetchAll(products => callback(products.filter(product => productIds.includes(product.getId()))))
}

module.exports.findById = (id, callback, notFoundCallback) => {
    fileUtils.read(
        'products.json',
        products =>  {
            const product = products.find(product => product.id === id)
            if (product) {
                callback(ProductModel.of(product))
            } else {
                notFoundCallback()
            }
        }
    )
}

module.exports.save = product => {
    if (!product.getId()) {
        product.setId(`${new Date().getTime()}`)
        fileUtils.readAndAppend('products.json', product)
    } else {
        this.update(product)
    }
}

module.exports.update = productModel => {
    fileUtils.read('products.json', products => {
        const index = products.findIndex(product => product.id === productModel.getId())
        products[index] = productModel
        fileUtils.write('products.json', products)
    })
}
