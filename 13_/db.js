const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

module.exports = {
    ObjectId: ObjectId,
    mongoose: mongoose,
    Schema: mongoose.Schema,
    model: mongoose.model,
    setup() {
        return mongoose
            .connect('mongodb://localhost:27017/shop')
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
