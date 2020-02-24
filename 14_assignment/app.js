const path = require('path')

const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')

const db = require('./db')

const userAuthenticationMiddleware = require('./middleware/user-authentication-middleware')

const adminAddProduct = require('./routes/admin/add-product')
const adminDeleteProduct = require('./routes/admin/delete-product')
const adminEditProduct = require('./routes/admin/edit-product')
const adminProducts = require('./routes/admin/products')
const cart = require('./routes/cart')
const cartDeleteItem = require('./routes/cart-delete-item')
const createOrder = require('./routes/create-order')
const index = require('./routes/index')
const login = require('./routes/login')
const orders = require('./routes/orders')
const pageNotFound = require('./routes/page-not-found')
const product = require('./routes/product')
const products = require('./routes/products')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressSession({ secret: 'my secret', resave: false, saveUninitialized: false, store: db.buildMongoDBStore(expressSession) }))
app.use(userAuthenticationMiddleware)

app.use('/admin', adminAddProduct.router)
app.use('/admin', adminDeleteProduct.router)
app.use('/admin', adminEditProduct.router)
app.use('/admin', adminProducts.router)
app.use(cart.router)
app.use(cartDeleteItem.router)
app.use(createOrder.router)
app.use(index.router)
app.use(login.router)
app.use(orders.router)
app.use(product.router)
app.use(products.router)

app.use(pageNotFound.router) 

db.setup()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => {
        console.error(err)
    })

