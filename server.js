const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./src/app/models/index');
const indexRouter = require('./src/routes/index');
var apiResponse = require('./src/app/helpers/apiResponse');
const { body } = require('express-validator/check');
const dotenv = require('dotenv').config();
const cors = require('cors');
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
global.__basedir = __dirname + '/';
if (dotenv.error) {
	throw dotenv.error;
}
//init createServer
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app/public')));

app.use(cors());

app.listen(port, () => console.log(`Server listen on port ${port}!`));

app.use('/api', indexRouter);

app.use('*', function(req, res) {
	return apiResponse.notFoundResponse(res, 'Page not found');
});
app.use(express.static('public'));

// error handler
app.use(function(err, req, res, next) {
	if (err.name == 'UnauthorizedError') {
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

db.connect((err) => {
	const collection = db.db('test').collection('devices');
	// perform actions on the collection object
	db.close();
});

module.exports = app;
