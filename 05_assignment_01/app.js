const express = require('express')

const app = express()

// first exercise
// app.use('/', (req, res, next) => {
//     console.log('Logging something')
//     next()
// })

// app.use('/', (req, res, next) => {
//     console.log('Logging something else')
//     res.send('<h1>Hello World</h1>')
// }) 


app.use('/users', (req, res, next) => res.send('<h1>Users page</h1>'))
app.use('/', (req, res, next) => res.send('<h1>Main page</h1>'))

app.listen(3000)
