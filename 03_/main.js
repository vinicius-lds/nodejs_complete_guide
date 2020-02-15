const routes = require('./routes')

module.exports.handler = (request, response) => {
    response.setHeader('Content-Type', 'text/html')
    response.write('<html>')
    response.write('<head>')
    response.write('<title>Enter message</title>')
    response.write('</head>')
    response.write('<body>')
    response.write('<form action="/message" method="POST">')
    response.write('<input type="text" name="message" />')
    response.write('<button type="submit">Send</button>')
    response.write('</form>')
    response.write('</body>')
    response.write('</html>')
    return response.end()
}
