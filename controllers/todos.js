const express = require('express')
const router = express.Router()
// const Plan = require('../models/planModel.js')
const Todo = require('../models/todoModel.js')


router.post('/', (req, res) => {
  Todo.create(req.body, (err, createdTodo) => {
    res.json(createdTodo)
  })
})


module.exports = router
