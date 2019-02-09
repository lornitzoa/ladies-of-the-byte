const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

app.use(express.json());
app.use(express.static("public"));

app.use(express.static('public'));
app.use(express.json());

const planController = require('./controllers/plan.js');
app.use('/plan', planController);

const todoController = require('./controllers/todos.js');
app.use('/todo', todoController);

app.listen(3000, ()=>{
  console.log('listening...');
});

mongoose.connect('mongodb://localhost:27017/planner', { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
  console.log('connected to mongoose...');
});
