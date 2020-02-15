const fs = require('fs')

module.exports.handler = (request, response) => {
    const body = []
    request.on('data', chunk => body.push(chunk))
    return request.on('end', () => {
        const parsedBody = Buffer.concat(body).toString()
        const messageContent = parsedBody.split('=')[1]
        return fs.writeFile('message.txt', messageContent, err => {
            response.statusCode = 302
            response.setHeader('Location', '/')
            return response.end()
        })
    })
}
