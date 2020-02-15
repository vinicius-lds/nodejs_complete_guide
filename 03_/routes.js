const defaultHandler = require('./default')
const main = require('./main')
const message = require('./message')


module.exports.routes = {
    '/': {
        'GET': main.handler,
    },
    '/message': {
        'POST': message.handler,
    },
}
module.exports.defaultHandler = defaultHandler.defaultHandler

