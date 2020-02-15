const http = require('http')

const RequestHandler = require('./infra/request-handler')

http.createServer(RequestHandler.handle).listen(3000)
