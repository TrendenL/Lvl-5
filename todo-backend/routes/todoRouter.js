const express = require('express')
const todoRouter = express.Router()
const {v4 : uuidv4} = require('uuid')

const todos = [
    {
        name: "The name",
        description: "The description of the todo",
        imageUrl: "http://www.myimage....",
        completed: false,
        _id: uuidv4()
    }
]

todoRouter.get('/', (req, res) => {
    res.send(todos)
})

todoRouter.get('/:todoId', (req, res) => {
    const todoId = req.params.todoId
    const findTodo = todos.find(todo => todo._id === todoId)
    res.send(findTodo)
})

todoRouter.post('/', (req, res) => {
    const newTodo = req.body
    newTodo._id = uuidv4()
    todos.push(newTodo)
    res.send('Successfully added todo')
})

todoRouter.put('/:todoId', (req, res) => {
    const todoId = req.params.todoId
    const updateObject = req.body
    const todoFindIndex = todos.findIndex(todo => todo._id === todoId)
    const updateTodo = Object.assign(todo[todoFindIndex], updateObject)
    res.send(updateTodo)
})

todoRouter.delete('/:todoId', (req, res) => {
    const todoId = req.params.todoId
    const todoIndex = todos.findIndex(todo => todo._id === todoId)
    todos.splice(todoIndex, 1)
    res.send('Successfully deleted todo')
})

module.exports = todoRouter