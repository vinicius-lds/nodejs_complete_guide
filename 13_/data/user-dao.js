const { db, toObjectId } = require('../db')

module.exports = {
    collectionName: 'users',
    deleteById(id) {
        return db().collection(this.collectionName).deleteOne({ _id: toObjectId(id) })
    },
    fetchAll() {
        return db().collection(this.collectionName).find().toArray()
    },
    findById(id) {
        return db().collection(this.collectionName).find({ _id: toObjectId(id) }).next()
    },
    save(user) {
        if (!user) {
            return new Promise(() => {})
        } else if (user.getId()) {
            return db().collection(this.collectionName).updateOne({ _id: toObjectId(user.getId()) }, { $set: user })
        } else {
            return db().collection(this.collectionName).insertOne(user)
        }
    },
    saveCart(user) {
        if (!user || !user.getId()) {
            return new Promise(() => { throw 'Cannot update cart of transient or inexistent user' })
        } else {
            return db().collection(this.collectionName).updateOne({ _id: toObjectId(user.getId()) }, { $set: { cart: user.getCart() } })
        }
    },
}
