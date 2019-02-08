const express = require('express');
const app = express();
const mongoose = require('mongoose');

const planController = require('./controllers/plan.js');
app.use('/plan/', planController);

app.listen(3000, ()=>{
  console.log('listening...');
});

mongoose.connect('mongodb://localhost:27017/planner', { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
  console.log('connected to mongoose...');
});
