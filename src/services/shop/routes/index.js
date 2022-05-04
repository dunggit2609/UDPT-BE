const express = require('express');
var shop = require('./shop');

var app = express();

app.use("/shop", shop)

module.exports = app;
