const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: Date,
  location: String,
  image: String // we can change this to url later
});

const Plans = mongoose.model('Plan', PlanSchema);

module.exports = Plans;
