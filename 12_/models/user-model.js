const { toObjectId } = require('../db')
const Order = require('./order-model')


module.exports = class User {

    static from(data) {
        const user = new User()
        user.setAll(data)
        return user
    }

    constructor(id, username, email, cart) {
        this.setId(id)
        this.setUsername(username)
        this.setEmail(email)
        this.setCart(cart)
    }

    addToCart(product) {
        this._initCart()
        const foundProducts = this.cart.items.filter(item => item._id.toString() === product._id.toString())
        if (foundProducts.length) {
            foundProducts[0].quantity++
        } else {
            this.cart.items.push({ _id: product._id, quantity: 1 })
        }
        
    }

    makeOrder(products) {
        this.resetCart()
        return new Order(undefined, { _id: this.getId(), name: this.getUsername() }, products)
    }

    setAll(data) {
        this.setId(data.id || data._id)
        this.setUsername(data.username)
        this.setEmail(data.email)
        this.setCart(data.cart)
    }

    removeFromCart(product) {
        this._initCart()
        this.cart.items = this.cart.items.filter(item => item._id.toString() !== product._id.toString())
    }

    removeFromCartByProductId(productId) {
        this._initCart()
        this.cart.items = this.cart.items.filter(item => item._id.toString() !== productId.toString())
    }

    resetCart() {
        this.cart = { items: [] }
    }

    getId() {
        return this._id
    }

    setId(id) {
        this._id = toObjectId(id)
    }

    setUsername(username) {
        this.username = username
    }

    getUsername() {
        return this.username
    }

    setEmail(email) {
        this.email = email
    }

    getEmail() {
        return this.email
    }

    setCart(cart) {
        this.cart = cart
    }

    getCart() {
        return this.cart
    }

    _initCart() {
        if (!this.cart) {
            this.cart = {}
        }
        if (!this.cart.items) {
            this.cart.items = []
        }
    }

}
