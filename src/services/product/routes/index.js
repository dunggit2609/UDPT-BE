const express = require('express');
var product = require('./product');

var app = express();

app.use('/product', product);

module.exports = app;
