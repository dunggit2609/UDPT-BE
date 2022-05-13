const express = require('express');
const productControler = require('../controllers/productController');
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');

router.get('/', function(req, res, next) {
	res.send('respond with product route');
});

router.post('/create', productControler.create);
