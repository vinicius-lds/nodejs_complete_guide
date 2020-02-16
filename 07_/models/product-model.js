

module.exports = class ProductModel {

    constructor(title) {
        this.setTitle(title)
    }

    getTitle() {
        return this.title
    }

    setTitle(title) {
        this.title = title
    }

}

