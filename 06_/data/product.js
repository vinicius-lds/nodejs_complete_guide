const products = []

exports.addProduct = product => {
    products.push(product)
    console.log('products', products)
}

exports.getProducts = () => [... products]
