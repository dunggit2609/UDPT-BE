const express = require('express');
var auth = require('./auth');
var user = require('./users');

var app = express();

app.use("/auth", auth)
app.use("/user", user)

module.exports = app;
