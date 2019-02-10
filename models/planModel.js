const mongoose = require('mongoose');

// const Todos = require('../models/todoModel.js')

const PlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: Date,
  location: String,
<<<<<<< HEAD
  image: String // we can change this to url later
=======
  image: String, // we can change this to url later
  todos: {type: Array}
>>>>>>> 67fce2ca9fe4e8f7e20a6444d6e96ca16adedd3e
});

const Plans = mongoose.model('Plan', PlanSchema);

module.exports = Plans;
