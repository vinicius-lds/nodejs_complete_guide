const { db, toObjectId } = require('../db')

module.exports = {
    collectionName: 'orders',
    deleteById(id) {
        return db().collection(this.collectionName).deleteOne({ _id: toObjectId(id) })
    },
    fetchAll() {
        return db().collection(this.collectionName).find().toArray()
    },
    findByUserId(userId) {
        return db().collection(this.collectionName).find({ 'user._id': toObjectId(userId) }).toArray()
    },
    findById(id) {
        return db().collection(this.collectionName).find({ _id: toObjectId(id) }).next()
    },
    save(order) {
        if (!order) {
            return new Promise(() => {})
        } else if (order.getId()) {
            return db().collection(this.collectionName).updateOne({ _id: toObjectId(order.getId()) }, { $set: order })
        } else {
            return db().collection(this.collectionName).insertOne(order)
        }
    },
}
