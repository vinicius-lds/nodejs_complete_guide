const { toObjectId } = require('../db')


module.exports = class Product {

    static from(data) {
        const productModel = new Product()
        productModel.setAll(data)
        return productModel
    }

    constructor(id, title, imageUrl, price, description, userId) {
        this.setId(id)
        this.setTitle(title)
        this.setImageUrl(imageUrl)
        this.setPrice(price)
        this.setDescription(description)
        this.setUserId(userId)
    }

    setAll(data) {
        this.setId(data.id || data._id)
        this.setTitle(data.title)
        this.setImageUrl(data.imageUrl)
        this.setPrice(data.price)
        this.setDescription(data.description)
        this.setUserId(data.userId)
    }

    getId(){
        return this._id
    }

    setId(id) {
        this._id = toObjectId(id)
    }

    getTitle() {
        return this.title
    }

    setTitle(title) {
        this.title = title
    }

    getImageUrl() {
        return this.imageUrl
    }

    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl
    }

    getPrice() {
        return this.price
    }   

    setPrice(price) {
        this.price = parseFloat(price)
    }

    getDescription() {
        return this.description
    }

    setDescription(description) {
        this.description = description
    }

    getUserId() {
        return this.userId
    }

    setUserId(userId) {
        this.userId = toObjectId(userId)
    }

}
