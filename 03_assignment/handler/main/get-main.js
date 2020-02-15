

exports.handle = (request, response) => {
    response.write('<html>')
    response.write('<head>')
    response.write('<title>')
    response.write('Dummy users page')
    response.write('</title>')
    response.write('</head>')
    response.write('<body>')
    response.write('<h1>')
    response.write('Greetings')
    response.write('</h1>')
    response.write('<h3>')
    response.write('Welcome to my NodeJS app!')
    response.write('</h3>')
    response.write('<form method="POST" action="/create-user">')
    response.write('<label for="username">Write your username here: </label>')
    response.write('<input id="username" name="username" type="text" placeholder="Username" />')
    response.write('<input type="submit" value="Submit Form" />')
    response.write('</form>')
    response.write('</body>')
    response.write('</html>')
    response.end()
}

