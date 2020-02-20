const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./data/database-connection')

const adminAddProduct = require('./routes/admin/add-product')
const adminDeleteProduct = require('./routes/admin/delete-product')
const adminEditProduct = require('./routes/admin/edit-product')
const adminProducts = require('./routes/admin/products')
const cart = require('./routes/cart')
const cartDeleteItem = require('./routes/cart-delete-item')
const index = require('./routes/index')
const orders = require('./routes/orders')
const pageNotFound = require('./routes/page-not-found')
const product = require('./routes/product')
const products = require('./routes/products')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminAddProduct.router)
app.use('/admin', adminDeleteProduct.router)
app.use('/admin', adminEditProduct.router)
app.use('/admin', adminProducts.router)
app.use(cart.router)
app.use(cartDeleteItem.router)
app.use(index.router)
app.use(orders.router)
app.use(product.router)
app.use(products.router)
app.use(pageNotFound.router) 

sequelize.sync().then(r => console.log(r)).catch(e => console.log(e))

app.listen(3000)
