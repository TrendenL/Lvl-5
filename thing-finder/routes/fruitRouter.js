const express = require('express')
const fruitRouter = express.Router()

fruits = [
    { type: "banana", brand: "chiquita", price: 0.5 },
    { type: "apple", brand: "gala", price: 0.5 },
    { type: "orange", brand: "naval", price: 0.75 }
]

fruitRouter.get('/', (req, res) => {
    res.send(fruits)
})

fruitRouter.get('/search/type', (req, res) => {
    const type = req.query.type
    const filteredFruits = fruits.filter(fruit => fruit.type === type)
    res.send(filteredFruits)
})

fruitRouter.post('/', (req, res) => {
    const newFruit = req.body
    fruits.push(newFruit)
    res.send(`Successfully added ${newFruit.type} to the list`)
})

module.exports = fruitRouter