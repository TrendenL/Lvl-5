const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// Connet to DB
mongoose.connect('mongodb://localhost:27017/bountiesdb',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => console.log('Connected to the DB'))

// middleware
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/bounties', require('./routes/bountyRouter'))

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log("Server running on Port 9000")
})