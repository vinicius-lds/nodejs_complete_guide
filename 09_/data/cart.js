const CartProductModel = require('../models/cart-product-model')
const CartModel = require('../models/cart-model')
const fileUtils = require('../utils/file-utils')


module.exports.addProductToCart = productModel => {
    this.fetchFirst(cartModel => {
        const cartProduct = cartModel.getItem(productModel.getId())
        if (cartProduct) {
            cartProduct.incQuantity()
        } else {
            cartModel.addItem(new CartProductModel(productModel.getId(), 1))
        }
        fileUtils.write('cart.json', [cartModel])
    })
}

module.exports.deleteItemsByProductId = productId => {
    this.fetchFirst(cartModel => {
        cartModel.removeItemByProductId(productId)
        fileUtils.write('cart.json', [cartModel])
    })
}

module.exports.fetchFirst = callback => {
    fileUtils.read('cart.json', rawData => {
        const items = rawData.length ? rawData[0].items : []
        const cartProductModelList = items.map(CartProductModel.of)
        callback(new CartModel(cartProductModelList))
    })
}
