const express = require('express')
const router = express.Router()
const Plan = require('../models/planModel.js')
const Todo = require('../models/todoModel.js')


router.post('/', (req, res) => {
  Plan.findByID(req.body.planId, (err, foundPlan) => {
    Plan.create(req.body, (err, createdTodo) => {
      foundPlan.todos.push(createdTodo)
      foundPlan.save((err, data) => {
        res.json(createdTodo)
      })
    })
  })
})

module.exports = router
