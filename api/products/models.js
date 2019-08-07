const { collection } = require('./db')

class Product {
    constructor(db_product) {
        this.product_id = db_product.product_id
        this.category = db_product.category
        this.link = db_product.link
        this.image = db_product.image
        this.name = db_product.name
        this.quantity = db_product.quantity
        this.price = db_product.price
        this.process()
    }

    process() {
        if(!this.image) {
            this.image = 'https://a07979a954be8a315ca4-84a6e28d8f0f268ef46f6c136379af96.ssl.cf3.rackcdn.com/assets/shared/lazy-load-placeholder-e2089ac2957349687fcdad918b88fae8ce4d5c94be8023969bb6fb910212ba91.png'
        }
    }
}

async function getProducts(page, limit) {
    const data = await collection.getAll(page, limit)
    return data
        .map(p => new Product(p))
}

async function getById(productId) {
    const data = await collection.getById(productId)
    return new Product(data)
}

module.exports = {
    getProducts,
    getById,
}
