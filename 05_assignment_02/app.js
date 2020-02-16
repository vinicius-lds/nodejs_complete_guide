const express = require('express')
const path = require('path')

const main = require('./routes/main')
const users = require('./routes/users')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(main.router)
app.use(users.router)

app.listen(3000)
