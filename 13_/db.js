const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

module.exports = {
    ObjectId: ObjectId,
    mongoose: mongoose,
    Schema: mongoose.Schema,
    model: mongoose.model,
    setup() {
        return mongoose
            .connect('mongodb+srv://vinicius-lds:bbxHqEDHQIgoaqRa@cluster0-5uo8n.gcp.mongodb.net/shop?retryWrites=true&w=majority')
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
