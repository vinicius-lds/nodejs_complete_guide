const GetMain = require('../handler/main/get-main')
const GetUsers = require('../handler/users/get-users')
const PostCreateUser = require('../handler/create-user/post-create-user')

exports.routingObject = {
    '/': {
        'GET': GetMain.handle,
    },
    '/users': {
        'GET': GetUsers.handle,
    },
    '/create-user': {
        'POST': PostCreateUser.handle,
    },
    defaultHandler(request, response) {
        const { url, method } = request
        const warn = `Routing not supported "${method}" - "${url}";`
        console.error(warn)
        response.write(warn)
        return response.end()
    },
}

