const low = require ('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs')

const products = JSON.parse(fs.readFileSync('/data/products.json', 'utf8'))

const adapter = new FileSync('/data/db.json')
const db = low(adapter)

db.set('products', products)
    .write()
