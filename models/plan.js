const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  description: String,
  complete: Boolean
});

const Plans = mongoose.model('Plan', PlanSchema);

module.exports = Plans;
