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
            .connect('mongodb+srv://vinicius-lds:bbxHqEDHQIgoaqRa@cluster0-5uo8n.gcp.mongodb.net/shop?retryWrites=true&w=majority')
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
