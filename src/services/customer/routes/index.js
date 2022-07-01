const express = require('express');
var customer = require('./customer');

var app = express();

app.use('/customer', customer);

module.exports = app;
