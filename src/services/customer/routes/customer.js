const express = require('express');
const CustomerController = require("../controllers/customerController")
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a Root Dir2');
});

router.post('/create', CustomerController.create)
// router.put('/update',[authenticate], CustomerController.create)
// router.get('/find',[authenticate], CustomerController.create)

module.exports = router;
