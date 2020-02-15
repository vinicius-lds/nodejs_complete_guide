const http = require('http')

const requestHandler = require('./request-handler')

const server = http.createServer(requestHandler.handle)
server.listen(3000)
