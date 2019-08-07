const { Collection } = require('../db')

COL_NAME = 'products'

class ProductsCollection extends Collection {
    constructor() {
        super(COL_NAME)
    }
}

const collection = new ProductsCollection()

module.exports = {
    collection
}
