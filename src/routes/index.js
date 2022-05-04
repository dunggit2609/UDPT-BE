const express = require('express');
var auth = require('./auth');
var user = require('./users');
var upload = require('./upload')

var app = express();

app.use("/auth", auth)
app.use("/user", user)
app.use("/upload", upload)

module.exports = app;
