

module.exports = class ProductModel {

    constructor(title, imageUrl, price, description) {
        this.setTitle(title)
        this.setImageUrl(imageUrl)
        this.setPrice(price)
        this.setDescription(description)
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
        this.price = price
    }

    getDescription() {
        return this.description
    }

    setDescription(description) {
        this.description = description
    }

}

