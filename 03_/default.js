module.exports.defaultHandler = (request, response) => {
    response.setHeader('Content-Type', 'text/html')
    response.write('<html>')
    response.write('<head>')
    response.write('<tittle>My first page</tittle>')
    response.write('</head>')
    response.write('<body>')
    response.write('<h1>Hello World</h1>')
    response.write('<body>')
    response.write('</body>')
    response.write('</html>')
    return response.end()
}
