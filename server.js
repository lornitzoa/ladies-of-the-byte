const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = mongoose.connection;
const NounProject = require('the-noun-project')
require('dotenv').config()

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGOLAB_CYAN_URI || 'mongodb://localhost:27017/' + 'planner';

app.use(session({
	secret: process.env.SECRET,
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

// dependency for api route
const apiController = require('./controllers/iconapi.js');
app.use('/iconapi', apiController)

app.listen(port, () => {
  console.log('listening...');
});

mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
  console.log('connected to mongoose...');
});
