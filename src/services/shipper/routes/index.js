const express = require('express');
var shipper = require('./shipper');

var app = express();

app.use("/shipper", shipper)

module.exports = app;
