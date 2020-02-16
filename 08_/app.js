const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const adminAddProduct = require('./routes/admin/add-product')
const adminProducts = require('./routes/admin/products')
const cart = require('./routes/cart')
const index = require('./routes/index')
const orders = require('./routes/orders')
const pageNotFound = require('./routes/page-not-found')
const products = require('./routes/products')

const app = express()

app.set('view engine', 'ejs')
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminAddProduct.router)
app.use('/admin', adminProducts.router)
app.use(cart.router)
app.use(index.router)
app.use(orders.router)
app.use(products.router)
app.use(pageNotFound.router)    

app.listen(3000)
