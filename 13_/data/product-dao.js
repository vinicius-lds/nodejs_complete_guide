const { db, toObjectId } = require('../db')

module.exports = {
    collectionName: 'products',
    deleteById(id) {
        return db().collection(this.collectionName).deleteOne({ _id: toObjectId(id) })
    },
    fetchAll() {
        return db().collection(this.collectionName).find().toArray()
    },
    fetchCartProducts(cart) {
        if (!cart || !cart.items || !cart.items.length) {
            return Promise.resolve(() => [])
        } else {
            return db()
                .collection(this.collectionName)
                .find({ _id: { $in: cart.items.map(item => item._id) } })
                .toArray()
                .then(products => {
                    return products.map(product => {
                        return { ...product, quantity: cart.items.find(item => item._id.toString() === product._id.toString()).quantity }
                    })
                })
        }
    },
    findById(id) {
        return db().collection(this.collectionName).find({ _id: toObjectId(id) }).next()
    },
    save(product) {
        if (!product) {
            return new Promise(() => {})
        } else if (product.getId()) {
            return db().collection(this.collectionName).updateOne({ _id: toObjectId(product.getId()) }, { $set: product })
        } else {
            return db().collection(this.collectionName).insertOne(product)
        }
    },
}
