
const dummyUsers = [
    'User_1',
    'User_2',
    'User_3',
    'User_4',
    'User_5',
    'User_6',
    'User_7',
]

exports.handle = (request, response) => {
    response.write('<html>')
    response.write('<head>')
    response.write('<title>')
    response.write('Dummy users page')
    response.write('</title>')
    response.write('</head>')
    response.write('<body>')
    response.write('<ul>')
    dummyUsers.forEach(dummyUser => {
        response.write('<li>')
        response.write(dummyUser)
        response.write('</li>')
    })
    response.write('</ul>')
    response.write('</body>')
    response.write('</html>')
    response.end()
}
