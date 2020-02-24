const { toObjectId, Schema, model } = require('../db')
const Order = require('./order-model')


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    require: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function(product) {
    const productIndex = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString())
    if (productIndex < 0) {
        this.cart.items.push({ productId: product._id, quantity: 1 })
    } else {
        this.cart.items[productIndex].quantity++;
    }
    return this.save()
}

userSchema.methods.removeFromCartByProductId = function(productId) {
    this.cart.items = this.cart.items.filter(item => item.productId.toString() !== productId.toString())
    return this.save()
}

userSchema.methods.clearCart = function() {
    this.cart = { items: [] }
    return this.save()
}

module.exports = model('User', userSchema)
