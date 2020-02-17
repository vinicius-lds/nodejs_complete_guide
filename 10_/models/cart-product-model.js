

module.exports = class CartProductModel {

    static of(data) {
        return new CartProductModel(data.productId, data.quantity)
    }

    constructor(productId, quantity) {
        this.productId = productId
        this.quantity = quantity
    }

    getProductId() {
        return this.productId
    }

    setProductId(productId) {
        this.productId = productId
    }

    getQuantity() {
        return this.quantity
    }

    setQuantity(quantity) {
        this.quantity = quantity
    }

    incQuantity() {
        this.quantity++;
    }

}
