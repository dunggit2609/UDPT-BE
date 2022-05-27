const express = require('express');
const order = require('./order')
var app = express();

app.use("/order", order)

module.exports = app;
