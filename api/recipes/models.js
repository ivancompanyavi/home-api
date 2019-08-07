const { collection } = require('./db')
const { Recipe } = require('./dao')
const { NotFoundError } = require('../errors')

async function createRecipe(recipe) {
    await collection.create(recipe)
    return recipe
}

async function getRecipes(page, limit) {
    const data = await collection.getAll(page, limit)
    return data
        .map(p => new Recipe(p));
}

async function getRecipe(recipeId) {
    const data = await collection.getById(recipeId)
    if (!data) {
        throw new NotFoundError(`Recipe ID '${recipeId}' not found`)
    }
    return new Recipe(data)

}

module.exports = {
    getRecipe,
    getRecipes,
    createRecipe,
}
