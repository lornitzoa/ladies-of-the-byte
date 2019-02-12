const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const NounProject = require('the-noun-project')
//
// nounProject = new NounProject({
// 	key: 'c6bed03aeb604f4eac8be077e9d9e31e',
// 	secret: 'e0854062025240839e319e527a65cff9'
// })
//
// nounProject.getIconsByTerm('goat', (err, data) => {
// 	console.log(data.icons);
// })


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

// dependency for api route
const apiController = require('./controllers/iconapi.js');
app.use('/iconapi', apiController)

app.listen(3000, () => {
  console.log('listening...');
});

mongoose.connect('mongodb://localhost:27017/planner', { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
  console.log('connected to mongoose...');
});
