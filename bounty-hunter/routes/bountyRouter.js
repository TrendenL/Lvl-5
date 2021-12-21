const express = require('express')
const bountyRouter = express.Router()
const Bounty = require('../models/bounty.js')

bountyRouter.get('/', (req, res, next) => {
    Bounty.find((err, bounties) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(bounties)
    })
})

bountyRouter.get('/:bountyId', (req, res) => {
    const bountyId = req.params.bountyId
    const foundBounty = bounties.find(bounty => bounty._id === bountyId)
    res.send(foundBounty)
})

bountyRouter.get('/search/type', (req, res, next) => {
    Bounty.find({type: req.query.type}, (err, bounties) => {
        if(err){
            res.status(500)
            return next(500)
        }
        return res.status(200).send(bounties)
    })
})

bountyRouter.post('/', (req, res, next) => {
    const newBounty = new Bounty(req.body)
    newBounty.save((err, savedBounty) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedBounty)
    })
})

bountyRouter.put('/:bountyId', (req, res, next) => {
    Bounty.findByIdAndUpdate(
        {_id: req.params.bountyId}, //find this one to update
        req.body, //update the object with data
        {new: true}, //send back the updated data
        (err, updatedBounty) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBounty)
        }
    )
})

bountyRouter.delete('/:bountyId', (req, res, next) => {
    Bounty.findByIdAndDelete({_id: req.params.bountyId}, (err, deletedBounty) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully eliminated ${deletedBounty.firstName} ${deletedBounty.lastName}`)
    })
})


module.exports = bountyRouter