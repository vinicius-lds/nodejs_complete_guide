const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const connectMongoDBSession = require('connect-mongodb-session');

module.exports = {
  MONGO_DB_URI: process.env.MONGO_DB_CONNECTION_STRING,
  ObjectId: ObjectId,
  mongoose: mongoose,
  Schema: mongoose.Schema,
  model: mongoose.model,
  buildMongoDBStore(session) {
    const MongoDBStore = connectMongoDBSession(session);
    return new MongoDBStore({
      uri: this.MONGO_DB_URI,
      collection: 'sessions'
    });
  },
  setup() {
    return mongoose
      .connect(this.MONGO_DB_URI)
      .then(result => {
        console.log('Successfuly connected to MongoDB');
        return result;
      })
      .catch(err => {
        console.error(err);
        throw 'Failed to connect to MongoDB';
      });
  },
  toObjectId(value) {
    if (!value || value instanceof ObjectId) {
      return value;
    } else {
      return new ObjectId(value);
    }
  }
};
