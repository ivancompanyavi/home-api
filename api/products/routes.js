const express = require('express')

const models = require('./models')

const router = express.Router()

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const products = await models.getProducts(page, limit)
    res.send(products)
})

router.get('/:productId', async (req, res) => {
    const product = await models.getById(req.params.productId)
    res.send(product)
})

module.exports = router
