

module.exports = class ProductModel {

    static of(data) {
        const productModel = new ProductModel()
        productModel.setAll(data)
        return productModel
    }

    constructor(title, imageUrl, price, description) {
        this.setTitle(title)
        this.setImageUrl(imageUrl)
        this.setPrice(price)
        this.setDescription(description)
    }

    setAll(data) {
        this.setId(data.id)
        this.setTitle(data.title)
        this.setImageUrl(data.imageUrl)
        this.setPrice(data.price)
        this.setDescription(data.description)
    }

    getId(){
        return this.id
    }

    setId(id) {
        this.id = id
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

}

