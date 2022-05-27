const express = require('express');
const OrderController = require("../controllers/orderController")
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a Root Dir2');
});

router.post('/get-with-filters',[authenticate], OrderController.getWithFilters)
router.post('/update-status',[authenticate], OrderController.updateStatus)

module.exports = router;
