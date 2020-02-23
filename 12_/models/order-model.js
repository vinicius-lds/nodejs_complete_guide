const { toObjectId } = require('../db')


module.exports = class Order {

    static from(data) {
        const order = new Order()
        order.setAll(data)
        return order
    }

    constructor(id, user, items) {
        this.setId(id)
        this.setUser(user)
        this.setItems(items)
    }

    setAll(data) {
        this.setId(data.id || data._id)
        this.setUser(data.user)
        this.setItems(data.items)
    }

    getId() {
        return this._id
    }

    setId(id) {
        this._id = toObjectId(id)
    }

    setUser(user) {
        this.user = user
    }

    getUser() {
        return this.user
    }

    setItems(products) {
        this.items = products
    }

    getItems() {
        return this.items
    }

}
