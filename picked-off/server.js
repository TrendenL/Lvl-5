const express = require('express')
const app = express()

const user = {name: "Joe", age: 32}

// middleware

app.get('/user', (req, res) => {
    res.send(user)
})

app.listen(9000, () => {
    console.log('This Server is running on Port 9000')
})