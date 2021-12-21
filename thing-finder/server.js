const express = require('express')
const app = express()

// middleware
app.use(express.json())

// routes
app.use('/fruits', require('./routes/fruitRouter.js'))

app.listen(9000, () => {
    console.log("This Server is running on Port 9000")
})