const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const addProduct = require('./routes/admin/add-product')
const main = require('./routes/main')
const pageNotFound = require('./routes/page-not-found')

const app = express()

app.set('view engine', 'ejs')
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(main.router)
app.use('/admin', addProduct.router)
app.use(pageNotFound.router)    

app.listen(3000)
