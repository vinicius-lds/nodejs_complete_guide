const { MongoClient, ObjectId } = require('mongodb')

const state = {}
module.exports = {
    ObjectId: ObjectId,
    client() {
        return state.client
    },
    db() {
        return state.db
    },
    setup() {
        return MongoClient
            .connect('mongodb://localhost:27017/shop')
            .then(client => {
                state.client = client
                state.db = client.db('shop')
                console.log('Connected to database')
                return this
            })
            .catch(err => {
                console.error(err)
                throw 'Failed to connect to MongoDB'
            })
    },
    toObjectId(value) {
        if (!value || value instanceof ObjectId) {
            return value
        } else {
            return new ObjectId(value)
        }
    }
}
