
class Recipe {
    constructor(db_recipe = {}) {
        this.id = db_recipe.id
        this.language = db_recipe.language
        this.description = db_recipe.description
        this.title = db_recipe.title
        this.steps = db_recipe.steps
        this.ingredients = db_recipe.ingredients
        this.cookingTime = db_recipe.cookingTime
        this.image = db_recipe.image
        this.process()
    }

    process() {
        if(!this.image) {
            this.image = 'https://a07979a954be8a315ca4-84a6e28d8f0f268ef46f6c136379af96.ssl.cf3.rackcdn.com/assets/shared/lazy-load-placeholder-e2089ac2957349687fcdad918b88fae8ce4d5c94be8023969bb6fb910212ba91.png'
        }
    }
}

module.exports = {
    Recipe,
}
