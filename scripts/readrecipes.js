const PdfReader = require('pdfreader')
const { Recipe } = require('../api/recipes/dao')
let doc = []
let rows = {}

let recipes = []


function processRows() {
    Object.keys(rows) // => array of y-positions (type: float)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
        .forEach((y) => doc.push((rows[y] || []).join('')))
}

function processDocument() {
    let currentRecipe = null, onRecipe, onSteps, onIngredients
    for(let i = 0, row; i < doc.length; i++) {
        row = doc[i]
        if(row.search(/CENA:|COMIDA:/i) !== -1) {
            onRecipe = true;
            if(currentRecipe && currentRecipe.title) {
                recipes.push(currentRecipe)
                onIngredients = false
                onSteps = false
            }
            currentRecipe = new Recipe()
            currentRecipe.title = row.match(/[CENA:|COMIDA]: (.*)/)[1]
            currentRecipe.steps = []
            currentRecipe.ingredients = []
        } else if(!onRecipe) {
            continue;
        } else if(row.includes('Ingredientes')) {
            onIngredients = true
            onSteps = false;
        } else if(row.includes('Preparaci')) {
            onSteps = true
            onIngredients = false;
        } else {
            if (onIngredients) {
                currentRecipe.ingredients.push(row)
            } else if (onSteps) {
                currentRecipe.steps.push(row)
            } else{
            }
        }
    }
    if (currentRecipe && currentRecipe.title) {
        recipes.push(currentRecipe)
    }
    // console.log(recipes);
    recipes.forEach(r => {
        console.log(r.title)
        console.log(r.ingredients)
    })
}

function main() {
    let file = ''
    if(process.argv.length > 2) {
        file = process.argv[2]
    }
    new PdfReader.PdfReader().parseFileItems(file, (err, item) => {
        if (!item || item.page) {
            processRows()
            rows = {} // clear rows for next page
        }
        else if (item.text) {
            // accumulate text items into rows object, per line
            (rows[item.y] = rows[item.y] || []).push(item.text)
        }
        if (!item) {
            processDocument()
        }
    })
}

main()

