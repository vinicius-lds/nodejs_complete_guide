
module.exports = class Cart {
    constructor(items) {
        this.setItems(items)
    }

    getItems() {
        return [... this.items]
    }

    setItems(items) {
        this.items = items ? items : []
    }

    getItem(productId) {
        return this.items ? this.items.find(cartProduct => cartProduct.productId === productId) : undefined
    }

    addItem(product) {
        this.items.push(product)
    }
    
    removeItemByProductId(productId) {
        this.setItems(this.getItems().filter(cartProductModel => cartProductModel.getProductId() !== productId))
    }

}
