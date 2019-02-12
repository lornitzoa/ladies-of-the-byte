const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'planit'

app.use(session({
	secret: "feedmeseymour",
	resave: false,
	saveUninitialized: false
}));

app.use(express.json());
app.use(express.static("public"));

const userController = require('./controllers/users.js')
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const planController = require('./controllers/plan.js');
app.use('/plan', planController);

const todoController = require('./controllers/todos.js');
app.use('/todo', todoController);

app.listen(3000, () => {
  console.log('listening...');
});

mongoose.connect('mongodb://localhost:27017/planner', { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
  console.log('connected to mongoose...');
});
