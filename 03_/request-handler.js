const routes = require('./routes')

module.exports.handle = (request, response) => {
    const { url, method } = request
    console.log(`Incoming request to url "${url}" using method "${method}".`)
    const callback = (routes.routes[url] && routes.routes[url][method]) || routes.defaultHandler
    return callback(request, response)
}

