const express = require('express')

const { wrapAsync } = require('../helpers')
const models = require('./models')
const { Recipe } = require('./dao')

const router = express.Router()

router.get('/:recipeId', wrapAsync(async (req, res, next) => {
    const recipe = await models.getRecipe(req.params.recipeId)
    res.locals.data = recipe
    next()
}))

router.get('/', wrapAsync(async (req, res, next) => {
    res.send('OK')
}))


module.exports = router
