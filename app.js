const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
	console.log('Database connection error: ' + err);
});


const app = express();

const users = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
require('./routes/auth')(app, passport);

app.use('/users', users);

app.get('/', (req, res) => {
	res.send('Invaid Endpoint');
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = 3000;
app.listen(port, () => {
	console.log('Server started on port ' + port);
});