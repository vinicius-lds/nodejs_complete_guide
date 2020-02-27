const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const connectMongoDBSession = require('connect-mongodb-session')

module.exports = {
    MONGO_DB_URI: 'mongodb://localhost:27017/shop',
    ObjectId: ObjectId,
    mongoose: mongoose,
    Schema: mongoose.Schema,
    model: mongoose.model,
    buildMongoDBStore(session) {
        const MongoDBStore = connectMongoDBSession(session)
        return new MongoDBStore({
            uri: this.MONGO_DB_URI,
            collection: 'sessions',
        })
    },
    setup() {
        return mongoose
            .connect(this.MONGO_DB_URI)
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