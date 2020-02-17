const ProductModel = require('../models/product-model')
const databaseConnection = require('./database-connection')


module.exports.deleteById = id => databaseConnection.execute('DELETE FROM product WHERE id = :id', { id: id })

module.exports.fetchAll = () => {
    return databaseConnection.execute('SELECT * FROM product')
            .then(([rows, _]) => new Promise(resolve => resolve(rows.map(row => ProductModel.of({ imageUrl: row.image_url, ...row })))))
            .catch(console.error)
}

module.exports.findBulkById = (productIds, callback) => {
    return databaseConnection.execute('SELECT * FROM products WHERE id IN (:productIds)', { productIds: productIds })   
            .then(([rows, _]) => Promise.resolve(() => rows.length ? rows.map(ProductModel.of) : []))
            .catch(console.error)
}

module.exports.findById = id => {
    return databaseConnection.execute('SELECT * FROM product WHERE id = :id', { id: id })
            .then(([rows, _]) => Promise.resolve(() => {
                const result = rows.map(ProductModel.of)
                if (result && result.length) {
                    return result[0]
                } else {
                    return undefined
                }
            }))
            .catch(console.error)
}

module.exports.save = productModel => {
    if (!productModel.getId()) {
        databaseConnection.execute(
            `INSERT INTO product (title, price, description, image_url)
            VALUES (:title, :price, :description, :imageUrl)`,
            productModel
        )
    } else {
        this.update(productModel)
    }
}

module.exports.update = productModel => {
    databaseConnection.execute('UPDATE product SET title = :title, price = :price, description = :description, image_url = :imageUrl)', productModel)
}
