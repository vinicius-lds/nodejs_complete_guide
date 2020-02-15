

exports.handle = (request, response) => {
    const data = []
    request.on('data', chunk => data.push(chunk))
    request.on('end', () => {
        const parsedData = Buffer.concat(data).toString()
        const username = parsedData.split('=')[1]
        console.log(`Username "${username}" registered!`)
    })
    response.statusCode = 302
    response.setHeader('Location', '/')
    response.end()
}