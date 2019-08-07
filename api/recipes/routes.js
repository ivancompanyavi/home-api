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
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const recipes = await models.getRecipes(page, limit)
    res.locals.data = recipes
    next()
}))

router.post('/', wrapAsync(async (req, res, next) => {
    const recipe = new Recipe(req.body)
    const createdRecipe = await models.createRecipe(recipe)
    res.locals.data = createdRecipe
    next()
}))

module.exports = router
