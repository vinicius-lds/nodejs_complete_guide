const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');
const compression = require('compression');
const csrf = require('csurf');
const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
const helmet = require('helmet');
const morgan = require('morgan');

const db = require('./db');

const templateRederingLocals = require('./middleware/template-redering-locals-middleware');

const adminAddProduct = require('./routes/admin/add-product');
const adminProduct = require('./routes/admin/product');
const adminEditProduct = require('./routes/admin/edit-product');
const adminProducts = require('./routes/admin/products');
const checkout = require('./routes/checkout/checkout');
const checkoutCancel = require('./routes/checkout/checkout-cancel');
const checkoutSuccess = require('./routes/checkout/checkout-success');
const cart = require('./routes/cart');
const cartDeleteItem = require('./routes/cart-delete-item');
const createOrder = require('./routes/create-order');
const index = require('./routes/index');
const internalError = require('./routes/internal-error');
const login = require('./routes/login');
const logout = require('./routes/logout');
const newPassword = require('./routes/new-password');
const orders = require('./routes/orders');
const pageNotFound = require('./routes/page-not-found');
const product = require('./routes/product');
const products = require('./routes/products');
const reset = require('./routes/reset');
const signup = require('./routes/signup');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  expressSession({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: db.buildMongoDBStore(expressSession)
  })
);
// app.use(csrf());
app.use(flash());
app.use(templateRederingLocals);
app.use(compression());
app.use(helmet());
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }));

app.use('/admin', adminAddProduct.router);
app.use('/admin', adminProduct.router);
app.use('/admin', adminEditProduct.router);
app.use('/admin', adminProducts.router);
app.use('/checkout', checkout.router);
app.use('/checkout', checkoutCancel.router);
app.use('/checkout', checkoutSuccess.router);
app.use(cart.router);
app.use(cartDeleteItem.router);
app.use(createOrder.router);
app.use(index.router);
app.use(internalError.router);
app.use(login.router);
app.use(logout.router);
app.use(newPassword.router);
app.use(orders.router);
app.use(product.router);
app.use(products.router);
app.use(reset.router);
app.use(signup.router);

app.use(pageNotFound.router);

app.use((err, req, res, next) => {
  console.error(err);
  return res.redirect('/500');
});

db.setup()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.error(err);
  });
