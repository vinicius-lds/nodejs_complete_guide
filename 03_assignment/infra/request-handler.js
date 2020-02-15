const routes = require('./routes').routingObject

exports.handle = (request, response) => {
    const { url, method } = request
    console.log(`Incoming request "${method}" - "${url}";`)
    const callback = routes && routes[url] && routes[url][method] || routes.defaultHandler
    return callback(request, response)
}
